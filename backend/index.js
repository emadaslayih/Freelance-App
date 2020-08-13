require("dotenv").config();

const express = require("express");

require("./config/db")();

const app = express();

// mdw
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.get("/", (req, res) => res.status(200).json({ message: "Atlantis App" }));

app.use("/users", require("./routes/users"));
app.use("/services", require("./routes/services"));
app.use("/categories", require("./routes/categories"));
app.use("/payments", require("./routes/payments"));
app.use("/subcategories", require("./routes/subcategories"));

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT + "...");
});
