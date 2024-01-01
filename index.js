require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const postsRouter = require("./routes/posts");
const session = require("express-session");
const passportStrategy = require("./passport");
const mongoose = require("mongoose");
const app = express();

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:8080"],
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

app.get("/", (req, res) => {
  res.send("Hello Meow");
});

app.use("/auth", authRoute);
app.use("/posts", postsRouter);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
