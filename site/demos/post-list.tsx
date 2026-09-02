import { PostList } from '@olwiba/ui';

const posts = [
  {
    title: 'A calmer path from idea to release',
    description:
      'How a small set of product conventions helps teams ship without redesigning every page.',
    date: '2026-08-24',
    slug: 'calmer-path-to-release',
    tags: ['Product'],
  },
  {
    title: 'Designing useful defaults',
    description:
      'Why good component defaults remove decisions while preserving deliberate escape hatches.',
    date: '2026-08-12',
    slug: 'designing-useful-defaults',
    tags: ['Design systems'],
  },
];

export default function Demo() {
  return <PostList posts={posts} />;
}
