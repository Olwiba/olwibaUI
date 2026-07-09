'use client';

import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, UserPlus } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
} from '@olwiba/cn';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';
import { DataTable } from '../components/DataTable';

export interface TeamMemberRecord {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface TeamMembersPanelProps {
  members: TeamMemberRecord[];
  /** Roles offered in the invite dialog and the per-row role menu. @default ['Owner', 'Admin', 'Member'] */
  roles?: string[];
  onInvite?: (email: string, role: string) => void;
  onRoleChange?: (memberId: string, role: string) => void;
  onRemove?: (memberId: string) => void;
  title?: string;
  description?: string;
}

function InviteDialog({ roles, onInvite }: { roles: string[]; onInvite?: (email: string, role: string) => void }) {
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState(roles[roles.length - 1] ?? roles[0]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Invite a team member</DialogTitle>
        <DialogDescription>They&rsquo;ll get an email invite to join this workspace.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="invite-email">Email address</Label>
          <Input id="invite-email" type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button disabled={!email} onClick={() => onInvite?.(email, role)}>Send invite</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

/**
 * Member list with role management and an invite dialog. One block for
 * team/org administration — built on `DataTable` rather than a bespoke list.
 */
export function TeamMembersPanel({
  members,
  roles = ['Owner', 'Admin', 'Member'],
  onInvite,
  onRoleChange,
  onRemove,
  title = 'Team members',
  description = 'Manage who has access to this workspace.',
}: TeamMembersPanelProps) {
  const columns = React.useMemo<ColumnDef<TeamMemberRecord>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={row.original.avatar} alt="" />
            <AvatarFallback>{row.original.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{row.original.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) =>
        onRoleChange ? (
          <Select value={row.original.role} onValueChange={(value) => onRoleChange(row.original.id, value)}>
            <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        ) : (
          <Badge variant="secondary">{row.original.role}</Badge>
        ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Row actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-destructive" onClick={() => onRemove?.(row.original.id)}>
              Remove member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
  ], [roles, onRoleChange, onRemove]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><UserPlus className="size-4" /> Invite member</Button>
          </DialogTrigger>
          <InviteDialog roles={roles} onInvite={onInvite} />
        </Dialog>
      </div>
      <DataTable columns={columns} data={members} searchKey="name" searchPlaceholder="Search members…" pageSize={0} />
    </div>
  );
}
