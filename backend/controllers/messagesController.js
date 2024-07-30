const asyncHandler = require("express-async-handler");
const MessageModel = require("../models/messageModel");

const addMessage = asyncHandler(async (req, res) => {
    try{
        const { from, to, message} = req.body;
        const data = await MessageModel.create({
            message:{text:message},
            users:[from, to ],
            sender: from,
        })
        if(data) return res.json({msg:"Message added succesfully"})
             return res.json({msg:"Failed to add message to the database"})

    }catch(error){
        console.log("faild to add the msg ",error);

    }
})
const getAllMessage = asyncHandler(async (req, res) => {
    try{
        const {from, to } = req.body;
        const messages = await MessageModel.find({
            users: {
                $all: [from, to ],

            }
        })
        .sort({updatedAt: 1});
        const projectMessages = messages.map((msg)=>{
            return {
                fromself:msg.sender.toString() === from,
                message: msg.message.text,
            }

        })
        res.json(projectMessages);
        


    }catch(error){
        console.log("getall message failed",error);

    }
})

    module.exports = {addMessage,getAllMessage };