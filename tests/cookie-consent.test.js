import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  CookieConsentBanner,
  CookieConsentProvider,
} from '../src/app/CookieConsent';

describe('CookieConsentBanner', () => {
  test('anchors to the right on larger screens', () => {
    const markup = renderToStaticMarkup(
      React.createElement(
        CookieConsentProvider,
        { required: true, initialConsent: null },
        React.createElement(CookieConsentBanner),
      ),
    );

    expect(markup).toContain('sm:left-auto');
    expect(markup).toContain('sm:right-4');
  });

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
