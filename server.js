require('dotenv').config();

const express = require("express");
const urlRoutes = require("./routes/url.routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});