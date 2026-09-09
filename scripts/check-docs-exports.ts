#!/usr/bin/env bun
/**
 * Validates that the documentation this package publishes is usable by another
 * site, and writes the manifest describing it.
 *
 * Publishing docs is not the same as publishing a library. The MDX and demos
 * were written for this repository's own site, where `~/` resolves and every
 * helper is a file away. Once installed elsewhere none of that holds, and the
 * failure is quiet: a demo that imports a path the consumer does not have
 * simply fails to render inside a lazy boundary.
 *
 * Run: bun scripts/check-docs-exports.ts
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'content', 'docs');
const DEMOS_DIR = join(ROOT, 'site', 'demos');
const MANIFEST = join(ROOT, 'docs-manifest.json');

const failures: string[] = [];
const fail = (message: string) => failures.push(message);

async function collect(dir: string, ext: string, base = dir): Promise<string[]> {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(full, ext, base)));
    else if (entry.name.endsWith(ext)) files.push(relative(base, full).split(sep).join('/'));
  }
  return files.sort();
}

const pkg = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8'));

// 1. The files have to actually ship.
for (const required of ['content', 'site/demos']) {
  if (!pkg.files?.includes(required)) {
    fail(`package.json "files" is missing ${JSON.stringify(required)}; the published tarball would omit it.`);
  }
}
for (const required of ['./content/*', './demos/*']) {
  if (!pkg.exports?.[required]) {
    fail(`package.json "exports" is missing ${JSON.stringify(required)}.`);
  }
}

const contentPages = await collect(CONTENT_DIR, '.mdx');
const demoFiles = await collect(DEMOS_DIR, '.tsx');

if (contentPages.length === 0) fail('No MDX found under content/docs.');
if (demoFiles.length === 0) fail('No demos found under site/demos.');

// 2. Every demo must resolve without this repository's path alias.
const relativeImports = new Map<string, string[]>();
for (const demo of demoFiles) {
  const source = await readFile(join(DEMOS_DIR, ...demo.split('/')), 'utf8');

  for (const match of source.matchAll(/from\s+['"](~\/[^'"]+)['"]/g)) {
    fail(`site/demos/${demo} imports ${match[1]}; consumer-local aliases do not resolve in an installed package.`);
  }

  // 3. Relative imports must stay inside the published demo directory.
  const siblings: string[] = [];
  for (const match of source.matchAll(/from\s+['"](\.[^'"]*)['"]/g)) {
    const specifier = match[1];
    if (specifier.startsWith('../')) {
      fail(`site/demos/${demo} imports ${specifier}, which escapes the published directory.`);
      continue;
    }
    siblings.push(specifier);

    const target = specifier.replace(/^\.\//, '');
    const resolved = ['.tsx', '.ts', '/index.tsx', '/index.ts'].some((ext) =>
      existsSync(join(DEMOS_DIR, ...`${target}${ext}`.split('/'))),
    );
    if (!resolved) {
      fail(`site/demos/${demo} imports ${specifier}, which does not resolve inside site/demos.`);
    }
  }
  if (siblings.length > 0) relativeImports.set(demo, siblings);
}

// 4. Sandbox ids referenced by MDX must exist in the registry, or an installed
//    consumer renders a page whose preview silently never appears.
const sandboxSource = existsSync(join(ROOT, 'site', 'lib', 'sandboxes.ts'))
  ? await readFile(join(ROOT, 'site', 'lib', 'sandboxes.ts'), 'utf8')
  : '';
// Keys appear both quoted and bare. Anchoring on the `id` that follows avoids
// matching object keys inside the template literals holding example source.
const registeredIds = new Set(
  [...sandboxSource.matchAll(/^\s{2}'?([\w-]+)'?:\s*\{\s*\r?\n\s*id:\s*'([\w-]+)'/gm)].map((m) => m[2]),
);

const referenced = new Map<string, string>();
for (const page of contentPages) {
  const source = await readFile(join(CONTENT_DIR, ...page.split('/')), 'utf8');
  for (const match of source.matchAll(/<Sandbox\s+id=["']([^"']+)["']/g)) {
    referenced.set(match[1], page);
    if (registeredIds.size > 0 && !registeredIds.has(match[1])) {
      fail(`content/docs/${page} references sandbox "${match[1]}", which is not registered in site/lib/sandboxes.ts.`);
    }
  }
}

const manifest = {
  package: pkg.name,
  version: pkg.version,
  generatedBy: 'scripts/check-docs-exports.ts',
  contentRoot: 'content/docs',
  demosRoot: 'site/demos',
  pages: contentPages,
  demos: demoFiles,
  sandboxIds: [...referenced.keys()].sort(),
};

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`@olwiba/ui docs exports`);
console.log(`  ${contentPages.length} pages, ${demoFiles.length} demos, ${referenced.size} sandbox references`);
console.log(`  ${relativeImports.size} demos use sibling modules, all resolving inside site/demos`);
console.log(`  manifest written to ${relative(ROOT, MANIFEST)}`);

if (failures.length > 0) {
  console.error(`\nFAIL — ${failures.length} problem(s):\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log('\nPASS — docs exports are self-contained.');
