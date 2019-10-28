const exec = require("child_process").exec; // eslint-disable-line
const execSync = require("child_process").execSync; // eslint-disable-line
const PercyScript = require("@percy/script"); // eslint-disable-line

console.log("starting");
exec("npm start");
execSync("until $(curl --output /dev/null --silent --head --fail http://localhost:3000); do printf '.'; sleep 5; done; sleep 20")
console.log("finished starting");

console.log("running tests");
PercyScript.run(async (page, percySnapshot) => {
  await page.goto("http://localhost:3000/");
  // ensure the page has loaded before capturing a snapshot
  await page.waitFor(".App");
  await percySnapshot("app");
  
  execSync("kill $(lsof -t -i:3000)");

});
console.log("finished running");



