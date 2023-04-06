const router =require("express").Router();
const User=require("../models/User");

// router.get("/",async(req,res)=>{
//     res.send("succesfully got")
// })

//update user

router.put("/:id" , async(req,res)=>{

    //req.params will take id that we wrote in put(/:id) where params is parameter
   
      if(req.body.userId===req.params.id  || req.body.isAdmin)
      {
        if(req.body.password)
        {
            try{
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt)
            }
            catch(err){
                return res.status(501).json(err)
            }
        }
        try{
            const user=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json("account has been updated")
        }
        catch(err)
        {
            return res.status(500).json(err)

        }
      }
      else {
        return res.send(403).json("you can only update your account !");
      }
})


 
//delete user

router.delete("/:id", async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin)
    {
        try{

            //will use find by id and pass id in the {}
            const user=await User.findByIdAndDelete({_id:req.params.id});
            res.status(200).json("your account is deleted succesfully")
        }
        catch(err)
        {
            return res.status(500).json(err);      
        }
    }
    else{
        return res.status(403).json("you can delete only ");
    }
})

//get a user by id

router.get("/:id" , async(req,res)=>{
    console.log("getting the result");
    try{
         const user= await User.findById(req.params.id);

        //  we can ignore the properties which is not needed
        // other will print all the neccesary infor expect pass and updat
        const {password,updatedAt, ...other}=user._doc

         res.status(200).json(other);
    }catch(err)
    {
        res.status(500).send(err);
    }
})

//follow user

router.put("/:id/follow",async(req,res)=>{
     if(req.body.userId !== req.params.id)
     {
        try{
            // user is whom curr user is going to follow
            const user=await User.findById(req.params.id);
            // console.log(user);

            //currentuser is trying to make request
            const currentUser=await User.findById(req.body.userId);
            // console.log(currentUser);

            // not already includes the following user
            if(!user.followers.includes(req.body.userId))
            {
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{following:req.params.id}})
                res.status(200).json("user has been followed");
            }
            //already folowed
            else
            {
                res.status(403).json("already followed");
            }
        }
        catch(err)
        {
            res.status(500).json(err)
        }
     }
     else
     {
        res.status(403).json("can't follow yourself");
     }
})


//unfollow user

router.put("/:id/unfollow",async(req,res)=>{
    
//userId under body m wo likhna jo follow krta h  aur link m wo likhna jisko unfollow krna h

     if(req.body.userId !== req.params.id)
     {
        try{
            // user is whom curr user is going to follow
            const user=await User.findById(req.params.id);

            //currentuser is trying to make request
            const currentUser=await User.findById(req.body.userId);

            // not already includes the following user
            if(user.followers.includes(req.body.userId))
            {
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{following:req.params.id}})
                res.status(200).json("user has been unfollowed");
            }
            //already folowed
            else
            {
                res.status(403).json("you are not following the user");
            }
        }
        catch(err)
        {
            res.status(500).json(err)
        }
     }
     else
     {
        res.status(403).json("can't unfollow yourself");
     }
})




module.exports=router;

