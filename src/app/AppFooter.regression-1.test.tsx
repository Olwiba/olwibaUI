import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AppFooter } from "./AppFooter";

describe("AppFooter responsive layout", () => {
  test("stacks its slots before the small breakpoint", () => {
    const html = renderToStaticMarkup(<AppFooter start="A longer product message" end="Status" />);

    expect(html).toContain("flex-col");
    expect(html).toContain("sm:flex-row");
    expect(html).toContain("items-start");
  });
});
