const router =require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Register
router.post("/register", async(req,res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
            ).toString(), //bec it will give us hashed value and we will store it in string format
    });

    try{

    const savedUser = await newUser.save();//save to db after waiting for vcouple of seconds bec it takes a bit of time to store data in db
    res.status(201).json(savedUser) //200 is successfull 201 is successfully edited
    }
    catch(err){
        res.status(500).json(err);
    }
});

//LOGIN

router.post("/login",async(req,res)=>{
    
    try{
    const user = await User.findOne(
        {
            username:req.body.username
        }
        );
    !user && res.status(401).json("Wrong Username!"); //is the user doesn't exist send wrong credentials
    
    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");

            const accessToken = jwt.sign({
                id:user._id,
                isAdmin:user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"} //After 3 days the user has to login again as his session will expire
            );
        const {password, ...others} = user._doc; //We do this to send every other details excpet the password as we can't reveal password
        res.status(200).json({...others, accessToken});
        }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;