const { describe } = require("yargs");
const login = require("./login");
const { exportAllDeclaration } = require("@babel/types");
describe("test login function", () => {
  test("status should be 200", () => {
    exportAllDeclaration(login());
  });
});
