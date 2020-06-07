/// <reference types="cypress" />

import React from "react";

import Button from ".";
import { mountWithTheme } from "../../theme/cypress/utils";

describe("Button component", () => {
  it("renders properly", () => {
    mountWithTheme(<Button>Sup</Button>);

    cy.get("button").contains("Sup");
  });

  it("renders theme colors", () => {
    mountWithTheme(<Button color="greenPrimary">Hello</Button>);

    cy.get("button")
      .should("have.css", "background-color")
      .and("eq", "rgb(80, 117, 97)");
  });
});
