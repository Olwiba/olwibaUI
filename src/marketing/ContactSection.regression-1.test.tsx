import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ContactSection } from "./ContactSection";

describe("ContactSection phone country", () => {
  test("allows a product to choose a local default", () => {
    const html = renderToStaticMarkup(<ContactSection defaultPhoneCountry="UK" />);

    expect(html).toContain('<option value="+44-UK" selected="">UK +44</option>');
  });
});
