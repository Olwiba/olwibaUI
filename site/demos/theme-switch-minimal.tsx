import { ThemeSwitchMinimal } from '@olwiba/ui';

export default function ThemeSwitchMinimalDemo() {
  return (
    <div className="flex items-center gap-4">
      <ThemeSwitchMinimal />
      <span className="text-sm text-muted-foreground">Click to toggle dark / light mode</span>
    </div>
  );
}
