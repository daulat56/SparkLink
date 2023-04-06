const route=require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt") //to protect the password

//REGISTER THE USER and will use the userschema

route.post("/register" , async(req,res)=>{
    // to catch any error
    try{

        // as bcrypt is an asynchronous function so it should be used in try
        // generate salt and then hash the passsword

        const salt=await bcrypt.genSalt(10); //num of rounds of encryption to be applied(10)
        const hashPassword=await bcrypt.hash(req.body.password,salt);
        const newUser=  new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword
        });

        // save user and send the response
        const user=await newUser.save();
        res.status(200).json(user)
    }
    catch(err)
    {
        console.log(err);
    }
    await User.save();
    // await User.save();
    res.send("ok registered")
})

// ________________________________LOGIN_________________________

route.post("/login", async(req, res) => {
    try {
    //   const user = await User.findOne({ 
    //     email: req.body.email ,
    //     password:req.body.password
    // });
    //   if (!user) {
    //     //
    //     return res.status(404).json("User not found");
    //   }
    //   else{
    //     // const validPassword=await bcrypt.compare(req.body.password,user.password)
    //     //     if(!validPassword)
    //     //     {
    //     //         return res.send("incorrect password")
    //     //     }
    //     res.send("succesfully logged in")

    //     }

    // instead of above we can use it in another way and no need to write the if and else

    const user=await User.findOne({email:req.body.email});
    !user && res.status(404).json("user is not found");

    const validatePassword=await  bcrypt.compare(req.body.password,user.password)
    !validatePassword && res.status(400).json("incorrect password")

    // if everything is fine then send status 200

    res.status(200).json(user);

      // continue with authentication logic
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
module.exports=route;