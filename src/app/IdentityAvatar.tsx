import type { CSSProperties, ReactNode } from 'react';
import { BirdIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, cn } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

/**
 * A stable miniature identity artwork, instead of one grey square or a pair
 * of initials for everybody.
 *
 * FNV-1a gives the same unsigned hash for the same name/email on every device.
 * Different byte ranges choose three hues and the gradient angle, so nearby
 * names do not merely receive nearby shades of the same two-colour gradient.
 *
 * Lightness stays in a bounded range so the white bird remains legible. The
 * radial highlight supplies depth without adding a fourth random colour.
 */
export function identityGradient(seed: string): CSSProperties {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  hash >>>= 0;

  const firstHue = hash % 360;
  const secondHue = (firstHue + 55 + ((hash >>> 8) % 70)) % 360;
  const thirdHue = (firstHue + 190 + ((hash >>> 16) % 110)) % 360;
  const angleHash = Math.imul(hash ^ (hash >>> 15), 2246822519) >>> 0;
  const angle = angleHash % 360;

  return {
    backgroundImage: [
      `radial-gradient(circle at 28% 18%, oklch(0.94 0.06 ${thirdHue} / 0.78), transparent 34%)`,
      `linear-gradient(${angle}deg, oklch(0.68 0.18 ${firstHue}), oklch(0.55 0.2 ${secondHue}) 52%, oklch(0.62 0.18 ${thirdHue}))`,
    ].join(', '),
    color: 'oklch(0.98 0 0)',
  };
}

/** The seed a person's artwork is drawn from: their name and email, normalised. */
export function identitySeed(person: { name?: string | null; email: string }): string {
  return `${person.name?.trim().toLocaleLowerCase() ?? ''}|${person.email.toLocaleLowerCase()}`;
}

export interface IdentityAvatarProps {
  /** Name and email seed the artwork, so a person looks the same everywhere. */
  name?: string | null;
  email: string;
  /** A photo, shown over the artwork when it loads. */
  image?: string | null;
  /** Replaces the bird inside the artwork, e.g. initials. */
  fallback?: ReactNode;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

/**
 * A person's avatar: their photo when there is one, otherwise the identity
 * artwork with a bird on it. The same component the app shell's account menu
 * uses, so someone in a members list matches their own sidebar avatar.
 */
export function IdentityAvatar({
  name,
  email,
  image,
  fallback,
  size = 'sm',
  className,
}: IdentityAvatarProps) {
  const uiMode = useUIMode();
  const mode = uiMode !== 'default' ? (uiMode as 'playful' | 'smooth') : undefined;

  return (
    <Avatar mode={mode} size={size} className={className}>
      {image && <AvatarImage src={image} alt={name ?? email} />}
      <AvatarFallback
        className={cn('text-white')}
        style={identityGradient(identitySeed({ name, email }))}
      >
        {fallback ?? (
          <BirdIcon aria-hidden className="size-5 drop-shadow-[0_1px_1px_rgb(0_0_0/0.3)]" />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
