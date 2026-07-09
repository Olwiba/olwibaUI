'use client';
import * as React from 'react';
import { TeamMembersPanel, type TeamMemberRecord } from '@olwiba/ui';

const initialMembers: TeamMemberRecord[] = [
  { id: '1', name: 'Kiwiana Ngata', email: 'kiwiana@nexus.dev', role: 'Owner' },
  { id: '2', name: 'Olwiba Rangi', email: 'olwiba@nexus.dev', role: 'Admin' },
  { id: '3', name: 'Genesis Tane', email: 'genesis@nexus.dev', role: 'Member' },
];

export default function Demo() {
  const [members, setMembers] = React.useState(initialMembers);

  return (
    <div className="mx-auto max-w-3xl p-8">
      <TeamMembersPanel
        members={members}
        onInvite={(email, role) =>
          setMembers((prev) => [...prev, { id: crypto.randomUUID(), name: email.split('@')[0], email, role }])
        }
        onRoleChange={(id, role) => setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)))}
        onRemove={(id) => setMembers((prev) => prev.filter((m) => m.id !== id))}
      />
    </div>
  );
}
