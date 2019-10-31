/* global cy */
// import { RouteName } from "src/";

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

    cy.get(".landing-search > input").type("sons");
    cy.get(".landing-search > button").click();
    // make sure we're on the search page and showing results
    cy.contains("Results for");
    cy.url().should("include", "/find");

    cy.get(".company-card")
      .first()
      .click();

    cy.go("back");

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
      .type("sipes")
      .type("{enter}");

    // go to fb company page
    cy.contains(".company-card", "Sipes Inc").click();

    // go to job page
    cy.get("input")
      .type("new york")
      .type("{enter}");
    cy.contains(".job-card", "New York").click();

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
    cy.url().should("include", "/companies");
  });
});
