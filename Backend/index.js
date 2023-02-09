const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const deportistasRouter = require("./routes/deportistas");
const authRouter = require("./routes/auth");

const app = express();
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());
app.use("/api", deportistasRouter);
app.use("/auth", authRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
