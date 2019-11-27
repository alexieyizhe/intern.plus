describe("Sort options", () => {
  beforeEach(() => {
    cy.visit("/find");

    // make sure we're on the search page and showing results
    cy.contains("Looking for something?");
    cy.url().should("include", "/find");
  });

  it("should be able to sort by salary", () => {
    cy.visit("/positions");

    cy.get(".options-menu").click({ force: true });

    cy.get(".job-card")
      .first()
      .find(".salaryAmt")
      .should("have.text", "1 - 38");

    cy.get(".options-menu .sort.select input")
      .click()
      .type("salary{downarrow}{enter}");

    cy.percySnapshot("Search page (options menu open)");

    cy.get(".options-menu .apply-button")
      .first()
      .click();
    cy.reload();

    cy.get(".job-card")
      .first()
      .find(".salaryAmt")
      .should("have.text", "75");
  });

  it("should be able to sort by number of reviews", () => {
    cy.visit("/companies");

    cy.get(".company-card")
      .first()
      .find(".ratings")
      .contains("(3)")
      .should("exist");

    cy.get(".options-menu").click({ force: true });

    cy.get(".options-menu .sort.select input")
      .click()
      .type("review count{downarrow}{enter}");

    cy.get(".options-menu .apply-button")
      .first()
      .click();
    cy.reload();

    cy.get(".company-card")
      .first()
      .find(".ratings")
      .contains("(9)")
      .should("exist");
  });

  it("should be able to sort by rating and then reset sort", () => {
    cy.visit("/positions");

    cy.get(".job-card")
      .first()
      .find(".ratings")
      .contains("2.0")
      .should("exist");

    cy.get(".options-menu").click({ force: true });

    cy.get(".options-menu .sort.select input")
      .click({ force: true })
      .type("rating{downarrow}{enter}");

    cy.get(".options-menu .apply-button")
      .first()
      .click();
    cy.reload();

    cy.get(".job-card")
      .first()
      .find(".ratings")
      .contains("5.0")
      .should("exist");

    cy.get(".options-menu .reset-options-button")
      .first()
      .click();
    cy.get(".options-menu .apply-button")
      .first()
      .click();
    cy.reload();

    // nothing should appear since we reset everything
    cy.get(".job-card").should("not.exist");
  });
});
