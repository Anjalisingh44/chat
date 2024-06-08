const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter the username"],
    },
    email: {
        type: String,
        required: [true, "Enter the email"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Enter the password"],
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
      avatarImage: {
        type: String,
        default: "",
      },
}, { timestamps: true }); // Move the timestamps option to the correct location

const User = mongoose.model('User', userSchema);
module.exports = User;
