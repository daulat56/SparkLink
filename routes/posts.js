const router=require("express").Router();
const Post=require("../models/Post");

// create post
router.post("/",async(req,res)=>{
    const newPost=await new Post(req.body);

    try{
        const savePost=await newPost.save()
    }
    catch(err){
        res.status(500).json(err)
    }
})





// update post
// delete post
// like post
// get a post
// get all post of all following and follower







module.exports=router;