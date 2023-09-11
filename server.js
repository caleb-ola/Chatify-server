import express from "express";
import chat from "./controllers/chat";
require("dotenv").config();

// app
const app = express();
const http = require("http").createServer(app);

// SOCKET IO SERVER
const io = require("socket.io")(http, {
  path: "/socket.io",
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["content-type"],
  },
});

// MIDDLEWARE
app.use(express.json({ limti: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// REST API
app.get("/api", (req, res) => {
  res.send("THIS IS THE REST API");
});

chat(io);

const port = process.env.PORT || 9000;
http.listen(port, () => console.log(`Server running on port ${port}`));
