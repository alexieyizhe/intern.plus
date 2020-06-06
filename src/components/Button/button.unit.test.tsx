import React from "react";
import { mount } from "cypress-react-unit-test";

import Button from "./index";

describe("Button component", () => {
  it("renders properly", () => {
    mount(withTheme(<Button color="greenDark">Sup</Button>));
    cy.get("button").contains("Sup");
  });
});
