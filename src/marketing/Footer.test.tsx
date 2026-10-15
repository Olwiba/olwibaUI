import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "./Footer";

describe("Footer", () => {
  test("renders the complete status pill as a mobile-safe link", () => {
    const html = renderToStaticMarkup(
      <Footer
        brand={{ name: "Nexus" }}
        status={{ label: "systems operational", severity: "operational", href: "/status" }}
      />,
    );

    expect(html).toContain('href="/status"');
    expect(html).toContain("touch-manipulation");
    expect(html).toContain("select-none");
    expect(html).toContain('data-slot="status-indicator-pulse"');
  });

  test("keeps the status dot alive when a source is degraded", () => {
    const html = renderToStaticMarkup(
      <Footer
        brand={{ name: "Nexus" }}
        status={{ label: "some sources limited", severity: "degraded" }}
      />,
    );

    expect(html).toContain("text-amber-500");
    expect(html).toContain('data-slot="status-indicator-pulse"');
  });
});
