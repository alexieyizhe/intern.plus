describe("Search autocomplete", () => {
  beforeEach(() => {
    cy.visit("/find");

    // make sure we're on the search page and showing results
    cy.contains("Looking for something?");
    cy.url().should("include", "/find");
  });

  it("should autocomplete a misspelled query", () => {
    cy.get(".search-field input")
      .type("sips")
      .type("{enter}");
    cy.get(".company-card").should("not.exist");

    cy.get(".search-field input").type("{downarrow}{downarrow}");

    cy.percySnapshot("Search page (autocomplete open)");

    cy.get(".search-field input").type("{enter}");

    // go to Sipes Inc company
    cy.get(".company-card")
      .first()
      .click();
    cy.contains("Sipes, Leffler");
  });
});
