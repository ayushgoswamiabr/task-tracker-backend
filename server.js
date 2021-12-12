const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const tasksroutes = require("./routes/tasks");
const loginroutes = require("./routes/login");
require("dotenv/config");
app.use(express.json());
app.use(cors());
app.use("/tasks", tasksroutes);
mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.URL}/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database Connected");
  }
);
app.use("/login", loginroutes);
const PORT = 5000;
//Serve static assests
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
