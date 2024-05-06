const bcrypt = require("bcrypt");
const generateToken = require('..//utils/generateToken');
const User = require("../models/userModel")

const signup = async (req,res)=>{
    console.log("hitted");
    try {
        console.log(req.body);

    const {firstName, lastName, password, email} = req.body;
    const userExit = await User.find({email});

    if (userExit){
        return res.send("user alredy exit");
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password,saltRound);

    const newUser = new User({
        email,
        firstName,
        lastName,
        hashedPassword,
    });

    const newUserCreated = await newUser.save();
    console.log(newUserCreated);

    if(!newUser){
        return res.send("user not created");
    }
    const token = generateToken(email);
    res.send("token");
          
} catch (error) {
    console.log(error);
    return res.send(error);
        
}
};

const signin = async (req,res)=>{
    try {
        const {password,email} = req.body;
        const user = await User.findOne({email});

        console.log(user);
    
        if (user){
            return res.send("user not exit");
        }

        const matchPassword = await bcrypt.compare(password, user.hashedPassword);

        if (!matchPassword){
            return res.send("password incorrect");
        }
        const token = generateToken(email);
        res.send("token");
    
    } catch (error) {
        console.log(error);
    }

};
module.exports ={signup, signin};