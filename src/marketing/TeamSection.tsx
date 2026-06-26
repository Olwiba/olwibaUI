'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, Badge } from '@olwiba/cn';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  initials: string;
  social?: {
    twitter?: string | null;
    github?: string | null;
    linkedin?: string | null;
  };
}

const defaultTeam: TeamMember[] = [
  {
    name: 'Olivia Reed',
    role: 'Co-Founder & CEO',
    bio: 'Previously led product at two YC companies. Obsessed with design systems and developer experience.',
    avatar: 'https://ui.shadcn.com/avatars/01.png',
    initials: 'OR',
    social: { twitter: '#', github: '#', linkedin: '#' },
  },
  {
    name: 'Marcus Webb',
    role: 'Co-Founder & CTO',
    bio: 'Full-stack engineer with 12 years building UI infrastructure. Open source maintainer.',
    avatar: 'https://ui.shadcn.com/avatars/02.png',
    initials: 'MW',
    social: { twitter: '#', github: '#', linkedin: '#' },
  },
  {
    name: 'Priya Nair',
    role: 'Head of Design',
    bio: 'Interaction designer turned design systems engineer. Bridges the gap between Figma and production.',
    avatar: 'https://ui.shadcn.com/avatars/03.png',
    initials: 'PN',
    social: { twitter: '#', github: null, linkedin: '#' },
  },
];

export interface TeamSectionProps {
  members?: TeamMember[];
  badge?: string;
  title?: string;
  description?: string;
}

export function TeamSection({
  members = defaultTeam,
  badge = 'Team',
  title = 'The people behind Olwiba',
  description = 'A small team with deep experience in design systems, open source, and developer tooling.',
}: TeamSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">{badge}</Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <div key={member.name} className="rounded-2xl border bg-muted/40 p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="size-12 rounded-xl">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="rounded-xl">{member.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="font-semibold leading-tight">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                {member.social && (
                  <div className="mt-4 flex items-center gap-2">
                    {member.social.twitter && (
                      <a href={member.social.twitter} aria-label="Twitter" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                        <Twitter className="size-3.5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} aria-label="GitHub" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                        <Github className="size-3.5" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} aria-label="LinkedIn" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                        <Linkedin className="size-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
