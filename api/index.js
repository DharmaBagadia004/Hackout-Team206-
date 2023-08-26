const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const contactRoute = require("./routes/contacts");
const cookieparser = require("cookie-parser");
// const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const speakerRoute = require("./routes/speakers");
const teamRoute = require("./routes/teams");
const eventRoute = require("./routes/events");
//const adminRoute = require("./routes/admin");
const registerRoute = require("./routes/registration");
const userRoute = require("./routes/users");
// const categoryRoute = require("./routes/categories");
const path = require("path");

let server = require("http").Server(app);
let io = require("socket.io")(server);
let stream = require("./src/ws/stream");
let favicon = require("serve-favicon");

const port = process.env.PORT || 5000;

app.use(require("./routes/auth"));
app.use(require("./routes/speakers"));
app.use(require("./routes/teams"));
app.use(require("./routes/events"));
app.use(require("./routes/registration"));
app.use(require("./routes/users"));
app.use(require("./routes/contacts"));
app.use(cookieparser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(favicon(path.join(__dirname, "./src/favicon.ico")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/speakers", speakerRoute);
app.use("/api/teams", teamRoute);
app.use("/api/events", eventRoute);
app.use("/api/registration", registerRoute);
app.use("/api/users", userRoute);
app.use("/api/contacts", contactRoute);
// app.use("/api/categories", categoryRoute);

io.of("/stream").on("connection", stream);

app.listen(port, () => {
  console.log("Backend is running.");
});
