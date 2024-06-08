const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModels");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password} = req.body;

    if (!username || !email || !password ) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    
    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ _id: user.id, username: user.username });
    } catch (error) {
        res.status(400);
        throw new Error("User data is not valid");
    }
});
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ _id: user.id, username: user.username });
    } else {
        res.status(401);
        throw new Error("username or password is not valid");
    }
});
const setAvatar = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (error) {
        res.status(400);
        throw new Error("UserAvatar data is not valid");
    }
});
const getAllUsers = asyncHandler(async (req, res) => {
    try{
        const users = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
    ]);
    return res.json(users);

    }catch(error){
        res.status(400);
        throw new Error(" Getall user is not valid");
    }   
});
    

module.exports = { registerUser, loginUser,setAvatar,getAllUsers};
