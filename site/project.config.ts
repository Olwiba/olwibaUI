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
    hex: "#a855f7",
    lightOklch: "oklch(0.546 0.245 293)",
    darkOklch: "oklch(0.623 0.214 291)",
  },
  theme: {
    initialDocsTheme: "purple",
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
