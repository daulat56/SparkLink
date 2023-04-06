const mongoose=require("mongoose");

const PostSchema =new mongoose.Schema({
    userId:{
        type: String,
        requires:true
    },

    desc:{
        type:String,
        max:500
    },

    img:{
        type:String,
    },

    likes:{
        type:String,
        default:[]
    }
},
// will create a timestamp which will get updated whenever above will get updated 

{timestamps:true}
)


//user is the model name
module.exports=mongoose.model("Post",PostSchema);