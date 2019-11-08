// =============================================================================
// Mounting React Components that use Styled Component
//
// Note: This is adapted from Gleb Bahmutov <gleb.bahmutov@gmail.com>
// License: ISC
// Source: https://github.com/bahmutov/cypress-react-unit-test
// =============================================================================

// having weak reference to styles prevents garbage collection
// and "losing" styles when the next test starts
const stylesCache = new Map();

const copyStyles = component => {
  // need to find same component when component is recompiled
  // by the JSX preprocessor. Thus have to use something else,
  // like component name
  const hash = component.type.name;

  let styles = document.querySelectorAll("head style");
  if (styles.length) {
    console.log("injected %d styles", styles.length);
    stylesCache.set(hash, styles);
  } else {
    console.log("No styles injected for this component, checking cache");
    if (stylesCache.has(hash)) {
      styles = stylesCache.get(hash);
    } else {
      styles = null;
    }
  }

  if (!styles) {
    return;
  }

  const parentDocument = window.parent.document;
  const projectName = Cypress.config("projectName");
  const appIframeId = `Your App: '${projectName}'`;
  const appIframe = parentDocument.getElementById(appIframeId);
  const head = appIframe.contentDocument.querySelector("head");
  styles.forEach(style => {
    head.appendChild(style);
  });
};

function setXMLHttpRequest(w) {
  // by grabbing the XMLHttpRequest from app's iframe
  // and putting it here - in the test iframe
  // we suddenly get spying and stubbing 😁
  window.XMLHttpRequest = w.XMLHttpRequest;
  return w;
}

function setAlert(w) {
  window.alert = w.alert;
  return w;
}

/* eslint-env mocha */
Cypress.Commands.add("mount", jsx => {
  // include React and ReactDOM from CDN to force DOM to register all DOM event listeners
  // otherwise the component will NOT be able to dispatch any events
  // when it runs the second time
  // https://github.com/bahmutov/cypress-react-unit-test/issues/3
  const html = `<body>
    <div id="app"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0/umd/react.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0/umd/react-dom.development.js"></script>
  </body>`;

  const document = cy.state("document");
  document.write(html);
  document.close();

  cy.window({ log: false })
    .then(setXMLHttpRequest)
    .then(setAlert)
    .its("ReactDOM.render")
    .then(render => {
      Cypress._component = render(jsx, document.getElementById("app"));
      Cypress.component = () => cy.then(() => Cypress._component);
    });

  copyStyles(jsx);
});
