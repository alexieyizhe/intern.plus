// describe("Search autocomplete", () => {
//   beforeEach(() => {
//     cy.visit("/find");

//     // make sure we're on the search page and showing results
//     cy.contains("Looking for something?");
//     cy.url().should("include", "/find");
//   });

//   it("should be able to sort by salary", () => {
//     cy.get(".search-field input")
//       .type("sips")
//       .type("{downarrow}{enter}");

//     cy.get(".options-menu").click({ force: true });

//     cy.get(".job-card")
//       .first()
//       .find(".salaryAmt")
//       .should("have.text", "37 - 49");

//     cy.get(".options-menu .sort.select input")
//       .click()
//       .type("salary{downarrow}{enter}");

//     cy.percySnapshot("Search page (options menu open)");

//     cy.get(".options-menu .apply-button")
//       .first()
//       .click();

//     cy.get(".job-card")
//       .first()
//       .find(".salaryAmt")
//       .should("have.text", "56");
//   });

//   it("should be able to sort by number of reviews", () => {
//     cy.visit("/companies");

//     cy.get(".company-card")
//       .first()
//       .find(".ratings")
//       .contains("(3)")
//       .should("exist");

//     cy.get(".options-menu").click({ force: true });

//     cy.get(".options-menu .sort.select input")
//       .click()
//       .type("review count{downarrow}{enter}");

//     cy.get(".options-menu .apply-button")
//       .first()
//       .click();

//     cy.get(".company-card")
//       .first()
//       .find(".ratings")
//       .contains("(11)")
//       .should("exist");
//   });

//   it("should be able to sort by rating", () => {
//     cy.visit("/positions");

//     cy.get(".job-card")
//       .first()
//       .find(".ratings")
//       .contains("2.0")
//       .should("exist");

//     cy.get(".options-menu").click({ force: true });

//     cy.get(".options-menu .sort.select input")
//       .click({ force: true })
//       .type("rating{downarrow}{enter}");

//     cy.get(".options-menu .apply-button")
//       .first()
//       .click();

//     cy.get(".job-card")
//       .first()
//       .find(".ratings")
//       .contains("5.0")
//       .should("exist");
//   });
// });
