/* eslint-disable */
declare namespace Cypress {
  interface cy {
    /**
     * Mounts a React component.
     * @param element the element to mount
     */
    mount(element): Chainable<any>;

    /**
     * Takes a percy snapshot.
     * @param name name of the snapshot
     */
    percySnapshot(name): Chainable<any>;
  }
}
