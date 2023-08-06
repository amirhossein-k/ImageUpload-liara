const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const uploadRouter = require("./routes/uploadRouter");
dotenv.config();

const app = express();

app.use(
  cors({
    orgin: "*",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));

app.get("/api/test", (req, res) => res.send({message: "test"}));

// Router

app.use("/api/uploade", uploadRouter);
