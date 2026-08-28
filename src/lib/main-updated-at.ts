import { execFileSync } from "node:child_process";

function parseDate(raw: string | undefined): Date | null {
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function gitCommitDate(ref: string): Date | null {
  try {
    const raw = execFileSync("git", ["log", "-1", "--format=%cI", ref], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return parseDate(raw);
  } catch {
    return null;
  }
}

function githubRepoFromRemote(): { owner: string; repo: string } | null {
  const owner = process.env.VERCEL_GIT_REPO_OWNER;
  const slug = process.env.VERCEL_GIT_REPO_SLUG;
  if (owner && slug) return { owner, repo: slug };

  try {
    const url = execFileSync("git", ["remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const match = url.match(/github\.com[:/]([^/]+)\/([^/.]+)(?:\.git)?$/);
    if (!match) return null;
    return { owner: match[1], repo: match[2] };
  } catch {
    return null;
  }
}

async function githubMainCommitDate(): Promise<Date | null> {
  const repo = githubRepoFromRemote();
  if (!repo) return null;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo.owner}/${repo.repo}/commits/main`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "quentinpages-astro",
        },
        signal: AbortSignal.timeout(3_000),
      },
    );
    if (!response.ok) return null;

    const payload = (await response.json()) as {
      commit?: { committer?: { date?: string } };
    };
    return parseDate(payload.commit?.committer?.date);
  } catch {
    return null;
  }
}

export async function getMainUpdatedAt(): Promise<Date | null> {
  const fromMain =
    gitCommitDate("origin/main") ?? gitCommitDate("main") ?? null;
  if (fromMain) return fromMain;

  const deployedBranch = process.env.VERCEL_GIT_COMMIT_REF;
  if (deployedBranch === "main" || deployedBranch === "master") {
    const fromHead = gitCommitDate("HEAD");
    if (fromHead) return fromHead;
  }

  return githubMainCommitDate();
}
