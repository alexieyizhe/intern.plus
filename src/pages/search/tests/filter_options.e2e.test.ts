describe("Search autocomplete", () => {
  it.only("should be able to filter by type", () => {
    cy.visit("/companies");

    cy.get("div.review-card").should("not.exist");

    cy.get(".options-menu .type.checkbox.reviews input").click();
    cy.get(".options-menu .apply-button").click();

    cy.url().should("include", "?t=reviews");

    cy.get(".review-card")
      .its("length")
      .should("be.gt", 0);
  });

  it("should be able to filter by min and/or max salary range", () => {
    cy.visit("/reviews");
    cy.get(".review-card")
      .first()
      .contains("Labadie - Kunde")
      .should("exist");

    cy.get(".options-menu .salary.min").type("38{enter}");
    cy.get(".options-menu .salary.max").type("40{enter}");
    cy.get(".options-menu .apply-button").click();

    cy.get(".review-card")
      .first()
      .contains("Weissnat, Hessel and Romaguera")
      .should("exist");
  });

  it("should be able to filter by location", () => {
    cy.visit("/positions");

    cy.get(".options-menu .location.select input").type("ohio{enter}");
    cy.get(".options-menu .apply-button").click();

    cy.get(".job-card").each(el => expect(el).to.contain("Ohio"));
  });

  it("should be able to filter by min and/or max rating range", () => {
    cy.visit("/companies");

    cy.get(".company-card")
      .first()
      .click();
    cy.url().should("include", "/companies/");

    cy.get(".job-card")
      .eq(1)
      .contains("2.0")
      .should("exist");

    // set min rating to 3 by clicking on third star and apply
    cy.get(".options-menu .rating.min .star-container")
      .children()
      .eq(2)
      .click();
    cy.get(".options-menu .apply-button").click();

    cy.get(".job-card")
      .eq(1)
      .should("not.exist");

    // set max rating to 3 as well and apply
    cy.get(".options-menu .rating.max .star-container")
      .children()
      .eq(2)
      .click();
    cy.get(".options-menu .apply-button").click();

    cy.get(".job-card").should("have.length", 0);

    cy.get(".options-menu .reset-options-button").click();
    cy.get(".options-menu .apply-button").click();

    cy.get(".job-card").should("have.length", 2);

    // set max rating to 3 only
    cy.get(".options-menu .rating.max .star-container")
      .children()
      .eq(2)
      .click();
    cy.get(".options-menu .apply-button").click();

    // only 2.0 rating should appear
    cy.get(".job-card")
      .eq(0)
      .contains("2.0")
      .should("exist");
  });
});
