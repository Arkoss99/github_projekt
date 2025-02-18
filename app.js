const fs = require("fs");
fs.writeFileSync("hello.txt", "Hello from Node.js");

const utils = require("./utils.js");
utils();
    
var validator = require("validator");
const result = validator.isEmail("foo@bar.com");
console.log(result);