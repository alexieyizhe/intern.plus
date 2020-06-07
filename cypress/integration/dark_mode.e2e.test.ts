/// <reference types="../support" />
describe("Dark mode", () => {
  // start test in DARK mode
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win, "matchMedia")
          .withArgs("(prefers-color-scheme: dark)")
          .returns({
            matches: false,
          });
      },
    });
  });

  it("can turn on and off dark mode", () => {
    // assert LIGHT mode on
    cy.get("body.light-mode").should("exist");
    // click to turn on dark mode
    cy.get("header").find("[aria-label='Toggle theme button']").click();

    // assert DARK mode on
    cy.get("body.dark-mode").should("exist");

    cy.percySnapshot("Dark mode home page");

    // click to turn off dark mode
    cy.get("header").find("[aria-label='Toggle theme button']").click();

    // assert LIGHT mode back on
    cy.get("body.light-mode").should("exist");
  });
});
