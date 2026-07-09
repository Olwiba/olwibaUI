'use client';
import { SettingsSection } from '@olwiba/ui';
import { Button, Input, Label } from '@olwiba/cn';

export default function Demo() {
  return (
    <div className="mx-auto max-w-2xl divide-y divide-border p-8">
      <SettingsSection title="Profile" description="This appears on your public Nexus profile.">
        <form className="max-w-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="settings-name">Full name</Label>
            <Input id="settings-name" defaultValue="Kiwiana Ngata" />
          </div>
          <Button type="submit" size="sm">Save</Button>
        </form>
      </SettingsSection>
      <SettingsSection title="Delete workspace" description="Once deleted, all projects and data are gone for good." danger>
        <Button variant="destructive" size="sm">Delete workspace</Button>
      </SettingsSection>
    </div>
  );
}
