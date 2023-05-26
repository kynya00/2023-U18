const express = require("express");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();

const users = [
  { 
    name: "user",
    password: "N15ED9RHwYf4tubE2zLz"
  },
  {
    name: "admin",
    password: Math.random().toString(32),
    canDelete: true,
    canGetFlag: true,
  },
];

let messages = [];
let lastId = 1;

function findUser(auth) {
  return users.find(
    (u) => u.name === auth.name && u.password === auth.password
  );
}

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(messages);
});

app.put("/", (req, res) => {
  const user = findUser(req.body.auth || {});

  if (!user) {
    res.status(403).send({ ok: false, error: "Access denied" });
    return;
  }

  const message = {
    icon: "👋",
  };

  _.merge(message, req.body.message, {
    id: lastId++,
    timestamp: Date.now(),
    userName: user.name,
  });

  messages.push(message);
  res.send({ ok: true });
});

app.delete("/", (req, res) => {
  const user = findUser(req.body.auth || {});

  if (!user || !user.canDelete) {
    res.status(403).send({ ok: false, error: "Access denied" });
    return;
  }

  messages = messages.filter((m) => m.id !== req.body.messageId);
  res.send({ ok: true });
});

app.get("/flag", (req, res) => {
  const user = findUser(req.body.auth || {});
  if (!user || !user.canGetFlag) {
    res.status(403).send({ ok: false, error: "Access denied" });
    return;
  }

  exec(`echo $FLAG`, (error, stdout, stderr) => {
    if (error) {
      res.send({ ok: true, err: "Something went wrong" });
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      res.send({ ok: true, err: "Something went wrong" });
      return;
    }
    res.send({ ok: true, flag: stdout });
    
    process.exit();
  });
 
});

app.listen(3000);
console.log("Listening on port 3000...");
