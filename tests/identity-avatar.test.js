import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { IdentityAvatar, identityGradient, identitySeed } from '../src/app/IdentityAvatar';

const avatar = (props) => renderToStaticMarkup(React.createElement(IdentityAvatar, props));

describe('IdentityAvatar', () => {
  test('the same person gets the same artwork, however their name is typed', () => {
    const a = identityGradient(identitySeed({ name: 'Priya ', email: 'Priya@Example.com' }));
    const b = identityGradient(identitySeed({ name: 'priya', email: 'priya@example.com' }));
    expect(a).toEqual(b);
  });

  test('different people get different artwork', () => {
    const priya = identityGradient(identitySeed({ name: 'Priya', email: 'priya@example.com' }));
    const sam = identityGradient(identitySeed({ name: 'Sam', email: 'sam@example.com' }));
    expect(priya.backgroundImage).not.toBe(sam.backgroundImage);
  });

  test('without a photo it draws the artwork with the bird', () => {
    const markup = avatar({ name: 'Priya', email: 'priya@example.com' });
    expect(markup).toContain('linear-gradient');
    expect(markup).toContain('lucide-bird');
  });

  test('a fallback replaces the bird', () => {
    const markup = avatar({ name: 'Priya', email: 'priya@example.com', fallback: 'PR' });
    expect(markup).toContain('PR');
    expect(markup).not.toContain('lucide-bird');
  });
});
