'use client';

import { AuthSection } from '@olwiba/ui';

export default function AuthSectionDemo() {
  return (
    <AuthSection
      layout="split"
      onSubmit={(e) => e.preventDefault()}
      onSso={() => {}}
      signUpHref="#"
      forgotPasswordHref="#"
    />
  );
}
