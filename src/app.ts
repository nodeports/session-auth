import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import connectDB from "./config/db";

const app = express();

connectDB();

app.use(express.json());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/myapp",
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
