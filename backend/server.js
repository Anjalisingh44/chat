const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
 
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5002;
app.use(cors());
app.use(express.json());
app.use(errorHandler)
app.use("/api/users", require("./routes/userRoutes"));
mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("DB Connection Successful")
}).catch((err)=>{
    console.log(err.message);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});