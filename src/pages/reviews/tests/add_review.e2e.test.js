describe("Search autocomplete", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("can open and close add review modal", () => {
    cy.get("#add-review-modal")
      .invoke("attr", "aria-hidden")
      .should("be", "true");
    cy.get("header")
      .find("[aria-label='Add review button']")
      .click();

    cy.get("#add-review-modal")
      .invoke("attr", "aria-hidden")
      .should("be", "false");

    cy.get("header")
      .find("[aria-label='Add review button']")
      .click();

    cy.get("#add-review-modal")
      .invoke("attr", "aria-hidden")
      .should("be", "true");
  });
});
