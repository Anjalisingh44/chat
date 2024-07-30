const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true,
        },
    },
    users: {
        type: Array, // Defining the type of `users` explicitly
        required: true, // Assuming you want this field to be required as well
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true }); // The `timestamps` option is correctly placed here

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
