import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the internet");
})

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})