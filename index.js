const express = require("express");
const { connection } = require("./database/connection");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes_article = require("./routes/Article");

app.use("/api", routes_article);

app.listen(PORT, () => {
  console.log(`App listened on port http://localhost:${PORT}`);
});
