import { fireConfetti } from '@olwiba/ui';

export default function ConfettiDemo() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => fireConfetti()}
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Fire confetti
      </button>
      <button
        onClick={() => fireConfetti({ centered: true, particleCount: 80 })}
        className="rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground hover:bg-muted/80"
      >
        Centered burst
      </button>
      <button
        onClick={() => fireConfetti({ colors: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff'] })}
        className="rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground hover:bg-muted/80"
      >
        Custom colors
      </button>
    </div>
  );
}
