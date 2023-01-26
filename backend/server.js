//Configuring Dotenv to use environment variables from .env file
require("dotenv").config();

//Connecting the database
const connectDB = require("./config/db");
connectDB();

//Creating express server
const express = require("express");
const app = express();

//Specifying the port
const port = process.env.PORT || 5000;

//Middlewares
//Enabling CORS
const cors = require("cors");
app.use(cors());
//Using Express.JSON
app.use(express.json());
//Custom Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
//User Route
const userRoutes = require("./routes/userRoute");
app.use("/api/user", userRoutes);
//NFT Route
const nftRoutes = require("./routes/nftRoute");
app.use("/api/nft", nftRoutes)

app.get("/", async (req, res) => {
  res.send(`
    <div style='width:100%; height:100%; display:flex; justify-content:center; align-items:center;'>
        <h1>Welcome to NFT based Warranty System by Drunken Bytes</h1>
    </div>
    `);
});


// Error Handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

//Listening om the port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
