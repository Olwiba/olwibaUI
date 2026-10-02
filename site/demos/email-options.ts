/**
 * The options an email demo renders with.
 *
 * Its own module, apart from the examples, so the preview frame can read the
 * defaults without importing the email components: those, and React's static
 * renderer, load only once something moves away from the defaults.
 */
export interface EmailExampleOptions {
  /** From the brand picker in the site header, not a demo control. */
  brandColor: string;
  logo: boolean;
  logoAlign: 'left' | 'center';
  /** Empty removes the footnote. */
  footnote: string;
}

export const DEFAULT_FOOTNOTE = "You're receiving this because you have a Nexus Inc account.";

/**
 * Each docs theme's primary colour as hex, for the email's brand colour.
 *
 * The themes are written in oklch, which mail clients do not read, so these
 * were converted once from the light `--primary` of each theme in
 * `@olwiba/docs`. Keep them in step if a theme's colour changes.
 */
const emailBrandByTheme: Record<string, string> = {
  default: '#171717',
  emerald: '#009966',
  blue: '#155dfc',
  purple: '#9810fa',
  rose: '#ff2056',
  orange: '#ff6900',
  slate: '#45556c',
};

/** Unknown themes fall back to emerald, as `@olwiba/docs` does for their styles. */
export function emailBrandFor(theme: string) {
  return emailBrandByTheme[theme] ?? emailBrandByTheme.emerald;
}

export const defaultEmailOptions: EmailExampleOptions = {
  brandColor: emailBrandFor('emerald'),
  logo: true,
  logoAlign: 'left',
  footnote: DEFAULT_FOOTNOTE,
};

export function isDefaultEmailOptions(options: EmailExampleOptions) {
  return (Object.keys(defaultEmailOptions) as Array<keyof EmailExampleOptions>).every(
    (key) => options[key] === defaultEmailOptions[key],
  );
}
