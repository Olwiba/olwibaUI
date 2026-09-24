import { AuthCheckEmail, AuthEmailVerified } from '@olwiba/ui';

export default function AuthStatusCardsDemo() {
  return (
    <div className="grid gap-6 rounded-2xl border bg-background p-6 lg:grid-cols-2">
      <AuthCheckEmail
        email="ada@gmail.com"
        onResend={async () => {
          await new Promise((resolve) => setTimeout(resolve, 600));
        }}
        resendCooldownSeconds={10}
        signInHref="#"
      />
      <AuthEmailVerified signInHref="#" />
    </div>
  );
}
