const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const socket = require("socket.io");
 
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5002;
app.use(cors());
app.use(express.json());
app.use(errorHandler)
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messagesRoute"));

mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("DB Connection Successful")
}).catch((err)=>{
    console.log(err.message);
});
 const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const io = socket (server,{
    cors:{
        origin:"http://localhost:5173",
        credentials: true,
    }
})
global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    console.log("New client connected:", socket.id);
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive", data.msg);
            console.log("Message sent from", data.from, "to", data.to);
        }
    })

})
