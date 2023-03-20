const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv"); 
const helmet = require("helmet");
const { notFoundErr, globalErrHandler } = require("./middleware/globalErrHandler");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const complaintRoute = require("./routes/complaint");
const leaseRoute = require("./routes/lease");
const noticeRoute = require("./routes/notice");
const buildingRoute = require("./routes/building");

const app = express(); 


dotenv.config()
mongoose.connect(
    process.env.DBASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to database successfully");
    }
);

//middleware
app.use(morgan('dev'));
app.use(express.json());//pass incoming json data
app.use(cors());
app.use(helmet());

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/complaints", complaintRoute);
app.use("/api/v1/notice", noticeRoute);
app.use("/api/v1/lease", leaseRoute);
app.use("/api/v1/building", buildingRoute)

//error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);


//server

app.listen(4001, () =>{
    console.log(`server is running on http://localhost:4001`);
});