/// <reference types="../support" />
describe("Add review modal", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("can be toggled through header", () => {
    cy.get("#add-review-modal")
      .invoke("attr", "aria-hidden")
      .should("eq", "true");
    cy.get("header").find("[aria-label='Add review button']").click();

    cy.get("#add-review-modal")
      .invoke("attr", "aria-hidden")
      .should("eq", "false");

    cy.get("header").find("[aria-label='Add review button']").click();

    cy.get("#add-review-modal")
      .invoke("attr", "aria-hidden")
      .should("eq", "true");
  });

  it("can be closed when clicking outside", () => {
    cy.get("#add-review-modal")
      .invoke("attr", "aria-hidden")
      .should("eq", "true");
    cy.get("header").find("[aria-label='Add review button']").click();

    cy.get("#add-review-modal")
      .invoke("attr", "aria-hidden")
      .should("eq", "false");

    cy.get(".landing-search").click();
    cy.get("#add-review-modal")
      .invoke("attr", "aria-hidden")
      .should("eq", "true");
  });

  it("will prevent unfilled review from being submitted", () => {
    cy.get("header").find("[aria-label='Add review button']").click();

    cy.get("#add-review-modal button.submit-button").click();

    cy.get("#add-review-modal").contains(
      "Please make sure you've filled out all fields correctly."
    );
  });

  it("can submit review", () => {
    cy.get("header").find("[aria-label='Add review button']").click();

    cy.get(".company-field input").type("Sons{downArrow}{enter}");

    // ensure existing job cannot update location
    cy.get(".job-field input").type("Chief{downArrow}{enter}");
    cy.get(".location-field input")
      .invoke("attr", "disabled")
      .should("eq", "disabled");

    cy.get(".job-field input").type("Custom Job Title{downArrow}{enter}");
    cy.get(".location-field input")
      .invoke("attr", "disabled")
      .should("equal", undefined);
    cy.get(".location-field input").type("Michigan{enter}");

    cy.get(".salary-field input").eq(0).type("222");
    cy.get(".salary-field input").eq(1).type("{downArrow}{enter}");
    cy.get(".salary-field input").eq(2).type("{downArrow}{enter}");

    cy.get(".review-body-field textarea").type(
      "Here is some fake review body text"
    );

    cy.get("#add-review-modal button.submit-button").click();
    cy.get("#add-review-modal").contains(
      "Please make sure you've filled out all fields correctly."
    );
    cy.get(".author-email-field .label h4").should(
      "have.css",
      "color",
      "rgb(255, 97, 102)"
    );
    cy.get(".overall-rating-field .label").should(
      "have.css",
      "color",
      "rgb(255, 97, 102)"
    );

    cy.get(".tags-field input").type("tag1 tag2{enter}");

    cy.get(".author-email-field input").type("bademail");

    cy.get(".overall-rating-field .star-container").children().eq(3).click();

    cy.get(".meaningful-work-rating-field .star-container")
      .children()
      .eq(2)
      .click();

    cy.get(".learning-mentorship-rating-field .star-container")
      .children()
      .eq(2)
      .click();

    cy.get(".work-life-balance-rating-field .star-container")
      .children()
      .eq(4)
      .click();

    cy.get("#add-review-modal button.submit-button").click();
    cy.get(".author-email-field .label h4").should(
      "have.css",
      "color",
      "rgb(255, 97, 102)"
    );

    cy.get(".author-email-field input").type(
      "{selectall}{backspace}goodemail@test.com"
    );
    cy.percySnapshot("Add review modal");

    cy.get("#add-review-modal button.submit-button").click();

    cy.get("#add-review-modal button.submit-button").contains("Confirm");
    cy.get(".review-body-field textarea")
      .invoke("attr", "disabled")
      .should("eq", "disabled");

    cy.get("#add-review-modal .cancel-submit-button").click();
    cy.get(".author-email-field input").type(
      "{selectall}{backspace}anotheremail@test.com"
    );
    cy.get("#add-review-modal button.submit-button").click();
    cy.get("#add-review-modal button.submit-button").click();

    cy.get("#add-review-modal").contains(
      "Thanks for helping your peers stay informed! Your review has been submitted and is pending approval for display."
    );

    cy.wait(5000);
    cy.get("#add-review-modal")
      .invoke("attr", "aria-hidden")
      .should("eq", "true");
  });
});
