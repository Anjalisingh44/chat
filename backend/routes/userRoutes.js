const express = require('express');
const router = express.Router();
const { registerUser,loginUser,setAvatar,getAllUsers } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/setAvatar/:id', setAvatar);
router.get('/getallusers/:id', getAllUsers)

module.exports = router;