const express = require("express");

const app = express();

//middlewares --> execute a function when we're on a specific route
// for ex, runnin AUTH function when we're on a specific route
app.use("/", () => {
  //   console.log("middleware home ");
});

// Routes
app.get("/", (req, res) => {
  res.send("onHome");
});

// server host
app.listen(5000);
