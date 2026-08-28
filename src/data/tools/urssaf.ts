/**
 * URSSAF / micro-social rates for the freelance quoting tool.
 *
 * Year: 2026.
 * Sources (consulted 2026-08):
 * - https://www.economie.gouv.fr/entreprises/gerer-sa-micro-entreprise/micro-entreprises-quel-est-le-montant-de-vos-cotisations-sociales
 * - https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html
 *
 * The published micro-social rate is a global percentage of collected turnover
 * (cotisations + CSG/CRDS). It does not include CFE, CFP, CCI/CMA taxes,
 * or income tax — unless the versement libératoire option is applied.
 *
 * Portage is not an URSSAF micro rate: it is a market approximation of
 * employer + employee charges + management fees.
 */

export const URSSAF_YEAR = 2026;

export const DEFAULT_AMOUNT = 1500;
export const DEFAULT_STATUS_ID = "micro-bnc" as const;
export const DEFAULT_MODE = "net-to-brut" as const;

export type CalcMode = "net-to-brut" | "brut-to-net";
export type StatusId = "micro-bnc" | "micro-bic-services" | "portage";

export interface UrssafStatus {
  id: StatusId;
  shortLabel: string;
  label: string;
  description: string;
  /** Global social rate on turnover / billed amount, 0–1. */
  socialRate: number;
  /** Optional IR versement libératoire, added on top of socialRate. */
  versementLiberatoireRate?: number;
  /** Annual micro turnover ceiling, when this statut is a micro-entreprise. */
  ceiling?: number;
  approximate?: boolean;
  approximationNote?: string;
}

export interface SimulationInput {
  mode: CalcMode;
  amount: number;
  statusId: StatusId;
  withVersementLiberatoire: boolean;
}

export interface Simulation {
  mode: CalcMode;
  status: UrssafStatus;
  withVersementLiberatoire: boolean;
  rate: number;
  amount: number;
  brut: number;
  net: number;
  contributions: number;
  output: number;
  overCeiling: boolean;
}

export const urssafStatuses: UrssafStatus[] = [
  {
    id: "micro-bnc",
    shortLabel: "Micro BNC",
    label: "Micro-enterprise · BNC (liberal profession)",
    description:
      "Intellectual services — engineering, design, consulting. Régime général.",
    socialRate: 0.256,
    versementLiberatoireRate: 0.022,
    ceiling: 83_600,
  },
  {
    id: "micro-bic-services",
    shortLabel: "Micro BIC",
    label: "Micro-enterprise · BIC services",
    description: "Commercial or craft services.",
    socialRate: 0.212,
    versementLiberatoireRate: 0.017,
    ceiling: 83_600,
  },
  {
    id: "portage",
    shortLabel: "Portage",
    label: "Portage salarial",
    description: "Employee, employer, and management fees.",
    socialRate: 0.5,
    approximate: true,
    approximationNote:
      "Usual range 45–55% all-in, depending on the portage company.",
  },
];

export const urssafAssumptions = {
  year: URSSAF_YEAR,
  included: [
    "Micro-social contributions, CSG/CRDS included in the URSSAF rate.",
    "Versement libératoire, only if you turn it on.",
  ],
  excluded: [
    "Income tax on the scale, unless VL is on",
    "CFE",
    "Vocational training (0.1–0.3%)",
    "CCI / CMA chamber taxes",
    "Health, provident, extra pension",
  ],
  sources: [
    {
      label: "economie.gouv.fr",
      detail: "Micro-enterprise contributions",
      href: "https://www.economie.gouv.fr/entreprises/gerer-sa-micro-entreprise/micro-entreprises-quel-est-le-montant-de-vos-cotisations-sociales",
    },
    {
      label: "autoentrepreneur.urssaf.fr",
      detail: "Essentials of the status",
      href: "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html",
    },
  ],
} as const;

export const urssafCopy = {
  modeLegend: "Calculation direction",
  modeNetToBrut: "I want the net",
  modeBrutToNet: "I invoice the gross",
  statusLegend: "Status",
  versementLiberatoire: "Versement libératoire",
  versementLiberatoireUnavailable: "Only available for micro-enterprise.",
  amountLabel: "Amount in euros",
  inputLead: {
    "net-to-brut": "I want",
    "brut-to-net": "I invoice",
  },
  outputLead: {
    "net-to-brut": "You should invoice",
    "brut-to-net": "You keep",
  },
  brut: "gross",
  netAfterUrssaf: "net after URSSAF",
  netAfterPortage: "net after portage",
  netAfterUrssafAndTax: "net after URSSAF and income tax",
  contributions: " contributions",
  charges: " charges",
  assumptionsSummary: "What’s in the rate",
  included: "In",
  excluded: "Out",
  sources: "Sources",
  approximateSuffix: " approx.",
  disclaimer: `Indicative, ${URSSAF_YEAR} rates. Unofficial.`,
  ceilingShort: `Above the ${URSSAF_YEAR} micro-enterprise ceiling.`,
} as const;

const statusById = new Map(urssafStatuses.map((status) => [status.id, status]));

export function getStatus(id: StatusId): UrssafStatus {
  const status = statusById.get(id);
  if (!status) {
    throw new Error(`Unknown URSSAF status: ${id}`);
  }
  return status;
}

export function supportsVersementLiberatoire(status: UrssafStatus): boolean {
  return status.versementLiberatoireRate !== undefined;
}

export function effectiveRate(
  status: UrssafStatus,
  withVersementLiberatoire: boolean,
): number {
  const liberatoire =
    withVersementLiberatoire && status.versementLiberatoireRate
      ? status.versementLiberatoireRate
      : 0;
  return status.socialRate + liberatoire;
}

export function brutFromNet(net: number, rate: number): number {
  if (rate >= 1) return Number.POSITIVE_INFINITY;
  return net / (1 - rate);
}

export function netFromBrut(brut: number, rate: number): number {
  return brut * (1 - rate);
}

export function simulate(input: SimulationInput): Simulation | null {
  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    return null;
  }

  const status = getStatus(input.statusId);
  const withVersementLiberatoire =
    input.withVersementLiberatoire && supportsVersementLiberatoire(status);
  const rate = effectiveRate(status, withVersementLiberatoire);

  const brut =
    input.mode === "net-to-brut"
      ? brutFromNet(input.amount, rate)
      : input.amount;
  const net =
    input.mode === "brut-to-net"
      ? netFromBrut(input.amount, rate)
      : input.amount;
  const contributions = brut - net;
  const output = input.mode === "net-to-brut" ? brut : net;
  const overCeiling =
    status.ceiling !== undefined && brut > status.ceiling + 1e-6;

  return {
    mode: input.mode,
    status,
    withVersementLiberatoire,
    rate,
    amount: input.amount,
    brut,
    net,
    contributions,
    output,
    overCeiling,
  };
}

export function parseAmount(raw: string): number | null {
  const normalized = raw
    .replace(/\s/g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  if (!normalized || normalized === ".") return null;

  const value = Number(normalized);
  if (!Number.isFinite(value) || value < 0) return null;
  if (value > 99_999_999) return 99_999_999;
  return value;
}

export function formatAmountInput(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatPercent(rate: number): string {
  const percent = rate * 100;
  const digits = Number.isInteger(percent) ? 0 : 1;

  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(rate);
}

export function netShare(rate: number): number {
  return Math.max(0, Math.min(1, 1 - rate));
}

export function netCaption(
  statusId: StatusId,
  withVersementLiberatoire: boolean,
): string {
  if (statusId === "portage") return urssafCopy.netAfterPortage;
  if (withVersementLiberatoire) return urssafCopy.netAfterUrssafAndTax;
  return urssafCopy.netAfterUrssaf;
}

export function chargesCaption(statusId: StatusId): string {
  return statusId === "portage" ? urssafCopy.charges : urssafCopy.contributions;
}

export function ceilingMessage(ceiling: number): string {
  return `Above the ${URSSAF_YEAR} micro-enterprise ceiling (${formatEuro(ceiling)} turnover).`;
}
