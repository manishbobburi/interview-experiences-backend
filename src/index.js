require("dotenv").config();
const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes");
const { ServerConfig } = require("./config");
const { errorHandler } = require("./middleware");

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(ServerConfig.PORT, () => console.log(`Server started running on PORT:`, ServerConfig.PORT));