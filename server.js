const express = require("express");

const app = express();

app.use(express.static(__dirname)); // Load the static files in the dist folder

// Look for the endpoint or file in the bundle.js in the index.html file
app.all("*", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
