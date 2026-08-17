// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://quentinpages.dev",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontshare(),
      name: "Satoshi",
      cssVariable: "--font-satoshi",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
    },
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--font-fraunces",
      weights: [500, 600],
      styles: ["italic"],
      subsets: ["latin"],
    },
  ],
});
