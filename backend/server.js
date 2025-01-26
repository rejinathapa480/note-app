require("dotenv").config();
const express = require("express");

const connectDb = require("./db/db");

const authenticate = require("./middlewares/authentication");

const app = express();

app.use(express.json());
app.use(express.urlencoded())

const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");


app.use("/api/auth", authRoutes);
app.use("/api/note", authenticate, noteRoutes);

connectDb().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log("Server listining at port", process.env.PORT || 5001);
  });
});
