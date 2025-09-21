import Express from "express";

const app = Express();

app.use(Express.json());

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Hello World</h1>`);
});

export default app;
