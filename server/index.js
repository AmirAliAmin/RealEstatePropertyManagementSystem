const express = require("express");
const dotenv = require("dotenv");
const {connectMongoDb} = require("./connection");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");




const authRouter = require("./routes/auth");
const propertyRoutes = require("./routes/property");
const publicRoutes = require("./routes/public");
const userRoutes = require("./routes/user");
const SalemanRoutes = require("./routes/saleman")
const inquiryRoutes = require("./routes/inquiry")


dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  credentials: true
}));

app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/auth", authRouter);
app.use("/api", propertyRoutes );
app.use("/api", publicRoutes);
app.use("/api/users", userRoutes);
app.use("/api/salesmen", SalemanRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.get("/", (req,res)=>{
    res.send("lets start ")
});

connectMongoDb("mongodb://127.0.0.1:27017/REPMS")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.listen(process.env.PORT,()=>{console.log("server started at PORT " + process.env.PORT)});  
