const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const admin = require("./routes/admin");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret", // Use uma variável de ambiente ou um valor padrão
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },

    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI ||
        "mongodb+srv://desireecdev:y45SiBineq0QW9x4@cluster0.tpwg7.mongodb.net/loja?retryWrites=true&w=majority&appName=Cluster0",
    }),
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//hadlebars
const handlebars = exphbs.create({
  defaultLayout: "main",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
  helpers: {
    eq: (a, b) => a === b,
  },
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://desireecdev:y45SiBineq0QW9x4@cluster0.tpwg7.mongodb.net/loja?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//rotas
app.use("/", admin);

app.use((req, res) => {
  res.status(404).send("Página não encontrada");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
