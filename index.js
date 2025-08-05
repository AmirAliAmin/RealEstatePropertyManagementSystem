const express = require("express");
const dotenv = require("dotenv");
const {connectMongoDb} = require("./connection");

const authRouter = require("./routes/auth");
const propertyRoutes = require("./routes/property");
const publicRoutes = require("./routes/public");
const userRoutes = require("./routes/user");


dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", propertyRoutes );
app.use("/api", publicRoutes);
app.use("api/users", userRoutes)

app.get("/", (req,res)=>{
    res.send("lets start ")
});

connectMongoDb("mongodb://127.0.0.1:27017/REPMS")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.listen(process.env.PORT,()=>{console.log("server started at PORT " + process.env.PORT)});  
