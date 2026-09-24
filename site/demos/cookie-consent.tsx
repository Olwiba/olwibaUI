import { CookieConsentBanner, CookieConsentProvider, useCookieConsent } from '@olwiba/ui';

function Status() {
  const { consent, openSettings } = useCookieConsent();
  return (
    <div className="space-y-3 text-sm text-muted-foreground">
      <p>
        Stored choice: <span className="font-medium text-foreground">{consent ?? 'none yet'}</span>
      </p>
      <button className="rounded-md border px-3 py-1.5" onClick={openSettings}>
        Cookie settings
      </button>
    </div>
  );
}

export default function CookieConsentDemo() {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-2xl border bg-background p-6">
      <CookieConsentProvider required cookieName="cookie_consent_demo">
        <Status />
        {/* Demo container overrides the fixed positioning context */}
        <div className="[&>div]:absolute">
          <CookieConsentBanner policyHref="#" />
        </div>
      </CookieConsentProvider>
    </div>
  );
}
