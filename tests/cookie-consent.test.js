import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  CookieConsentBanner,
  CookieConsentProvider,
} from '../src/app/CookieConsent';

describe('CookieConsentBanner', () => {
  test('puts the positive choice before the negative choice', () => {
    const markup = renderToStaticMarkup(
      React.createElement(
        CookieConsentProvider,
        { required: true, initialConsent: null },
        React.createElement(CookieConsentBanner),
      ),
    );

    expect(markup.indexOf('Accept')).toBeGreaterThan(-1);
    expect(markup.indexOf('Accept')).toBeLessThan(markup.indexOf('Reject'));
  });
});
