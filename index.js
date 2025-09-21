/* eslint-disable no-undef */
import Express from "express";

const app = Express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Express world.");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
