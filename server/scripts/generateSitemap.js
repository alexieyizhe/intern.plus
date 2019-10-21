require("babel-register");

const router = require("../../src/App.tsx").default;
const Sitemap = require("../").default;

new Sitemap(router).build("http://intern.plus").save("./sitemap.xml");
