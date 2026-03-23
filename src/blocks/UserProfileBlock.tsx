'use client';

import * as React from 'react';
import { Camera, Github, Globe, Linkedin, MapPin, Twitter } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Input,
  Label,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@olwiba/cn';

const stats = [
  { label: 'Projects', value: '24' },
  { label: 'Contributions', value: '1.4k' },
  { label: 'Following', value: '83' },
  { label: 'Followers', value: '312' },
];

const recentActivity = [
  { action: 'Pushed to', target: 'olwibaUI', time: '2 hours ago' },
  { action: 'Opened PR in', target: 'olwibaCN', time: '5 hours ago' },
  { action: 'Commented on', target: 'genesis-render#42', time: '1 day ago' },
  { action: 'Released', target: '@olwiba/ui v0.0.3', time: '2 days ago' },
];

export function UserProfileBlock() {
  const [editing, setEditing] = React.useState(false);

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      {/* Cover */}
      <div className="relative h-32 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent sm:h-40" />

      <div className="px-6 pb-8 sm:px-8">
        {/* Avatar + actions */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="-mt-10 sm:-mt-12">
            <div className="group relative inline-block">
              <Avatar className="size-20 rounded-2xl border-4 border-card sm:size-24">
                <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="Olivia Reed" />
                <AvatarFallback className="rounded-2xl text-xl">OR</AvatarFallback>
              </Avatar>
              <button
                aria-label="Change avatar"
                className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Camera className="size-5 text-white" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 pb-1">
            <Button variant="outline" size="sm" onClick={() => setEditing((v) => !v)}>
              {editing ? 'Cancel' : 'Edit profile'}
            </Button>
            <Button size="sm">Follow</Button>
          </div>
        </div>

        {/* Name + meta */}
        <div className="mt-4 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold">Olivia Reed</h2>
            <Badge variant="secondary">Pro</Badge>
          </div>
          <p className="text-sm text-muted-foreground">@olivia · Co-Founder & CEO at Olwiba</p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="size-3.5" /> San Francisco, CA</span>
            <a href="#" className="flex items-center gap-1 hover:text-foreground"><Globe className="size-3.5" /> olwiba.com</a>
            <a href="#" className="flex items-center gap-1 hover:text-foreground"><Twitter className="size-3.5" /> @olivia</a>
            <a href="#" className="flex items-center gap-1 hover:text-foreground"><Github className="size-3.5" /> olivia</a>
            <a href="#" className="flex items-center gap-1 hover:text-foreground"><Linkedin className="size-3.5" /> olivia-reed</a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap gap-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-lg font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <Tabs defaultValue={editing ? 'edit' : 'activity'} value={editing ? 'edit' : undefined}>
          <TabsList>
            <TabsTrigger value="activity" onClick={() => setEditing(false)}>Activity</TabsTrigger>
            <TabsTrigger value="edit" onClick={() => setEditing(true)}>Edit profile</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="mt-4 space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded-xl border bg-muted/40 px-4 py-3 text-sm">
                <span>
                  <span className="text-muted-foreground">{item.action} </span>
                  <span className="font-medium">{item.target}</span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="edit" className="mt-4">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setEditing(false); }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Display name</Label>
                  <Input defaultValue="Olivia Reed" />
                </div>
                <div className="space-y-1.5">
                  <Label>Username</Label>
                  <Input defaultValue="olivia" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Bio</Label>
                <Textarea
                  defaultValue="Co-Founder & CEO at Olwiba. Building the design system layer for modern products."
                  className="resize-none"
                  rows={3}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Location</Label>
                  <Input defaultValue="San Francisco, CA" />
                </div>
                <div className="space-y-1.5">
                  <Label>Website</Label>
                  <Input defaultValue="https://olwiba.com" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
