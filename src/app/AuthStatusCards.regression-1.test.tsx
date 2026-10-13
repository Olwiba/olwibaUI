import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AuthEmailVerified } from "./AuthStatusCards";

describe("AuthEmailVerified heading semantics", () => {
  test("uses its title as the page heading", () => {
    const html = renderToStaticMarkup(<AuthEmailVerified signInHref="/sign-in" />);

    expect(html).toContain("<h1>Email verified</h1>");
  });
});
