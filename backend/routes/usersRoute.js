const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/register', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const user = await newUser.save();
        res.send('User registered successfully');
    } catch (error) {
        return res.status(400).json({error});
    }    
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
try {
    const user = await User.findOne({email: email, password: password});
    if (user) {
        const temp = {                      //We dont want to send password ..
            name: user.name,
            email: user.email,
            _id: user._id,
            isAdmin: user.isAdmin
        }
        res.send(temp);
    } else {
        return res.status(400).json({message: "Login Failed"});
    }
} catch (error) {
    return res.status(400).json({error});
}});

// Admin req. -Get all users
router.get('/getallusers', async(req, res) => {
    try {
        const users = await User.find({ });
        res.send(users);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
