// // const pwdgen = require("pwdgen");
// import pwdgen from "pwdgen";

// const test = pwdgen(8, { includeLowerCase: true, includeNumbers: true });
// console.log(test);
// import pass from "pack";

// const pass = require("./package/bundle.js");
// import pass from "package";
// import pass from "./package/bundle.mjs";
// import randomPassword from "./package/bundle.js";
// const pass = require("randompass");
import pass from "randompass";
const test = pass(8, {
  includeLowerCase: true,
  includeNumbers: true,
});
console.log(test);
