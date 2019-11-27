describe("Filter options", () => {
  it("should be able to filter by type", () => {
    cy.visit("/companies");

    cy.get("div.review-card").should("not.exist");

    cy.get(".options-menu .type.checkbox.reviews input").click();
    cy.get(".options-menu .apply-button").click();

    cy.url().should("include", "?t=reviews");
    cy.reload();

    cy.get(".review-card")
      .its("length")
      .should("be.gt", 0);
  });

  it.only("should be able to filter by min and/or max salary range", () => {
    cy.visit("/reviews");
    cy.get(".review-card")
      .first()
      .contains("Labadie - Kunde")
      .should("exist");

    cy.get(".options-menu .salary.min").type("38{enter}");
    cy.get(".options-menu .salary.max").type("40{enter}");
    cy.get(".options-menu .apply-button").click();

    cy.url().should("include", "fs");
    cy.reload();

    cy.get(".review-card")
      .first()
      .click();

    cy.get("#review-page .salary-amt").contains("38");
  });

  it("should be able to filter by location", () => {
    cy.visit("/positions");

    cy.get(".options-menu .location.select input").type("ohio{enter}");
    cy.get(".options-menu .apply-button").click();

    cy.url().should("include", "fl");
    cy.reload();

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

    cy.url().should("include", "fr");
    cy.reload();

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

    cy.reload();

    cy.get(".job-card").should("have.length", 2);

    // set max rating to 3 only
    cy.get(".options-menu .rating.max .star-container")
      .children()
      .eq(2)
      .click();
    cy.get(".options-menu .apply-button").click();

    cy.reload();

    cy.get(".job-card")
      .first()
      .find(".ratings")
      .contains("2.0")
      .should("exist");
  });
});
