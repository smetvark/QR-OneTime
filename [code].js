
const fs = require("fs");
const path = require("path");

const codesPath = path.resolve(__dirname, "../../codes.json");
let codes = JSON.parse(fs.readFileSync(codesPath));

module.exports = (req, res) => {
  const {
    query: { code },
  } = req;

  if (!code || !codes[code]) {
    return res.status(404).send("Invalid code.");
  }

  if (!codes[code].used) {
    // Mark as used
    codes[code].used = true;
    fs.writeFileSync(codesPath, JSON.stringify(codes, null, 2));
    // Redirect to success image
    return res.redirect("/success.jpg");
  } else {
    // Already used
    return res.redirect("/used.jpg");
  }
};
