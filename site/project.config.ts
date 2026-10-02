type ProjectThemeConfig = {
  id: string
  label: string
  brandAccent: {
    hex: string
    lightOklch: string
    darkOklch: string
  }
  theme: {
    initialDocsTheme: string
  }
}

export const projectConfig = {
  id: "olwibaUI",
  label: "olwibaUI",
  brandAccent: {
    hex: "#84cc16",
    lightOklch: "oklch(0.648 0.200 131.684)",
    darkOklch: "oklch(0.841 0.238 132.900)",
  },
  theme: {
    // Must name a theme @olwiba/docs knows. "lime" did not, so the site fell
    // back to emerald while the header picker showed nothing selected.
    initialDocsTheme: "emerald",
  },
} as const satisfies ProjectThemeConfig

export const projectThemeStyleCss = `:root {
  --project-brand-accent: ${projectConfig.brandAccent.lightOklch};
  --project-brand-accent-dark: ${projectConfig.brandAccent.darkOklch};
}`

export const projectBanner = {
  segments: [
    { text: "olwiba" },
    { text: "UI", colorHex: projectConfig.brandAccent.hex },
  ],
}
