/* eslint-disable */
declare namespace Cypress {
  interface cy {
    /**
     * Mounts a React component.
     * @param element the element to mount
     */
    mount(element): Chainable<any>;
  }
}
