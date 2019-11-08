import React from "react";
import { withTheme } from "../../theme/withTheme";

import Button from "./index";

describe("Button component", () => {
  it("works", () => {
    cy.mount(withTheme(<Button color="greenDark">Sup</Button>));
    cy.get("button").contains("Sup");
  });
});
