import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AuthSection } from "./AuthSection";

describe("AuthSection heading semantics", () => {
  test("gives the built-in auth form a page heading", () => {
    const html = renderToStaticMarkup(<AuthSection mode="signin" onSubmit={() => {}} />);

    expect(html).toContain("<h1>Sign in</h1>");
  });
});
