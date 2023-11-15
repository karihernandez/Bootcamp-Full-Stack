const http = require("http");
const express = require("express");
const { createDbConn } = require("./db");
const { getUserModel } = require("./models");
const { json } = require("body-parser");

const PORT = 3000;

const db = createDbConn("bootcamp");
const User = getUserModel();

const app = express();
const server = http.createServer(app);

app.use(json());

app.get("/users/married", async (req, res) => {
  const users = await User.find({ married_status: true });
  res.status(200).json({ users });
});

app.get("/users", async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
});

app.put("/users", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const userExists = !!user;

    if (!userExists) {
      const newUser = new User(req.body);
      await newUser.save();
      return res.status(201).json({ message: "User created" });
    }

    res.status(200).json({ ok: true, userExists });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.delete("/users/:email", async (req, res) => {
  try {
    const user = await User.deleteMany({ email: req.params.email });

    if (user.deletedCount === 0) {
      return res.status(204).send();
    }

    return res.status(200).json({ message: "User(s) deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

process.on("SIGINT", () => {
  // Perform any cleanup or shutdown tasks here
  console.log("Received SIGINT signal, stopping the server gracefully.");

  server.close(() => {
    console.log("Server has been gracefully stopped.");
    process.exit(0);
  });
});

server.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
