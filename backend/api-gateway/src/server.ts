import express from "express";

const app = express();
const PORT = process.env.GATEWAY_PORT || 80;

app.get("/", (req, res, next) => {
  res.status(200).send("Up and running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
