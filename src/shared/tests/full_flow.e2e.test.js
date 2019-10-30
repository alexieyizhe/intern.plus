/* global cy */

/**
 * - Visit landing page
 * - Type: 'Google' in search input
 * - Click: search button
 * - Click: Google company
 * - Type: 'waterloo' in search input
 * - Click: first card for Software Engineer job
 * - Verify: location is Waterloo
 * - Type: 'free food' in search input
 * - Click: first card for review
 * - Click: close modal button
 * - Click: logo to go to home page
 */

describe("Full flow", () => {
  it("successfully loads and searches", () => {
    cy.visit("/");

    cy.get(".landing-search > input").type("Google");
    cy.get(".landing-search > button").click();
    cy.contains("Results for");

    cy.get(".company-card")
      .contains("Google")
      .click();

    cy.go("back");

    cy.get("input")
      .clear()
      .type("Waterloo")
      .type("{enter}");

    // trigger pagination and make sure it works
    cy.scrollTo("bottom");
    cy.scrollTo("bottom");
    cy.get("section")
      .children()
      .should("have.length.greaterThan", 20);

    // go to browse companies page and search for Facebook
    cy.get("nav")
      .find("a")
      .contains("companies")
      .click();
    cy.get("input")
      .clear()
      .type("Facebook")
      .type("{enter}");

    // go to fb company page
    cy.contains(".company-card", "Facebook").click();

    // go to job page
    cy.get("input")
      .type("toronto")
      .type("{enter}");
    cy.contains(".job-card", "Toronto").click();

    // go to review modal
    cy.get(".review-card")
      .first()
      .click();

    cy.wait(1000);

    cy.get("#review-page")
      .parent()
      .click("topLeft"); // click outside to close

    // go back to landing by clicking logo
    cy.get("header .logo-img").click();

    // open first review card on landing page
    cy.get(".review-card")
      .first()
      .click();

    cy.wait(1000);

    cy.get("#review-page")
      .find("button")
      .click(); //  click button to close
  });

  it("goes to jobs page and gets to a company through a job card", () => {
    // go to browse jobs page and click the first job
    cy.get("nav")
      .find("a")
      .contains("positions")
      .click();
    cy.get(".job-card")
      .first()
      .click();

    // click the company link to go to the company
    cy.get(".job-details-card")
      .find("a")
      .first()
      .click();
  });
});
