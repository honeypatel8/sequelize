const express = require("express");
const bodyParser = require("body-parser");
require("./models/index.js");
const controllers = require("./controllers/userController");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/users", controllers.fetchUsers);
app.get("/user/:id", controllers.fetchUser);
app.post("/user", controllers.createUser);
app.delete("/user/:id", controllers.deleteUser);
app.patch("/user/:id", controllers.updateUser);
app.get("/dummy", controllers.dummy);

app.listen(8800, () => {
  console.log("Server active on PORT 8800");
});
