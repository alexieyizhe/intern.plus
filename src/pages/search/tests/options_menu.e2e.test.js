describe("Search autocomplete", () => {
  beforeEach(() => {
    cy.visit("/find");

    // make sure we're on the search page and showing results
    cy.contains("Looking for something?");
    cy.url().should("include", "/find");
  });

  it("should be able to sort by salary", () => {
    cy.get(".search-field input")
      .type("sips")
      .type("{downarrow}{enter}");

    cy.get(".job-card")
      .first()
      .find(".salaryAmt")
      .should("have.text", "33");

    cy.get(".options-menu input")
      .click()
      .type("salary{downarrow}{enter}");

    cy.percySnapshot("Search page (options menu open)");

    cy.get(".job-card")
      .first()
      .find(".salaryAmt")
      .should("have.text", "56");
  });
});
