require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.get("/info", (req, res) => res.json({message: "API is live."}))


app.listen(process.env.PORT, () => console.log(`Server started running on PORT:`, process.env.PORT));