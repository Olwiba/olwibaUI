import { StepsSection } from '@olwiba/ui';

export default function Demo() {
  return (
    <div className="space-y-6">
      <StepsSection
        variant="timeline"
        badge="How it works"
        title="Up and running in minutes"
        description="Numbered timeline with a fading accent line, chainable step groups, and rich step content."
        groups={[
          {
            steps: [
              {
                title: 'Create your account',
                description: 'Sign up with your email to get started. Free while in beta.',
              },
              {
                title: 'Connect your channel',
                description: (
                  <>
                    Add the bot to a group chat or DM, then send{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-primary">!bot start</code>{' '}
                    to activate.
                  </>
                ),
              },
              {
                title: 'Add your first monitor',
                description: 'Paste a search URL and the bot checks for new results every few minutes.',
              },
            ],
            after: (
              <div className="rounded-lg border border-primary/30 bg-muted/40 p-6">
                <h3 className="mb-1 text-lg font-semibold text-primary">Ready to get started?</h3>
                <p className="text-sm text-muted-foreground">Set up your first alert — free.</p>
              </div>
            ),
          },
          {
            steps: [
              {
                title: 'Found what you needed?',
                description: 'Cancel anytime — one command removes every monitor.',
              },
              {
                title: 'Share it forward 💖',
                description: 'Know someone searching? Send them an invite.',
              },
            ],
          },
        ]}
      />

      <StepsSection
        badge="Default variant"
        title="The original horizontal layout"
        steps={[
          { emoji: '✍️', title: 'Sign up', description: 'Create an account in seconds.' },
          { emoji: '🔌', title: 'Connect', description: 'Link your tools and data.' },
          { emoji: '🚀', title: 'Ship', description: 'Go live with confidence.' },
        ]}
      />
    </div>
  );
}
