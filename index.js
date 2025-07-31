const express = require("express");
const dotenv = require("dotenv");
const {connectMongoDb} = require("./connection");
const authRouter = require("./routes/auth")


dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req,res)=>{
    res.send("lets start ")
})

connectMongoDb("mongodb://127.0.0.1:27017/REPMS")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.listen(process.env.PORT,()=>{console.log("server started at PORT " + process.env.PORT)});  
