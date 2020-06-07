import React from "react";
import { mount } from "cypress-react-unit-test";

import Button from "./index";
import { withTheme } from "../../theme/cypress/withTheme";

describe("Button component", () => {
  it("renders properly", () => {
    mount(withTheme(<Button color="greenPrimary">Sup</Button>)); // @todo: Fix this
    cy.get("button").contains("Sup");
    cy.get("button")
      .should("have.css", "background-color")
      .and("eq", "rgb(80, 117, 97)");
  });
});
