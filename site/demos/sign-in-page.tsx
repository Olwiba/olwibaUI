import { Navbar, AuthSection } from '@olwiba/ui';

export default function SignInPageDemo() {
  return (
    <div className="w-full max-w-6xl space-y-4">
      <Navbar />
      <AuthSection layout="split" />
    </div>
  );
}
