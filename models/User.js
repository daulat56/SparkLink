const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },

    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },

    profilePicture:{
        type:String,
        default:""
    },

    coverPicture:{
        type:String,
        default:""
    },

    followers:{
        type:Array, //will add the number like 1 2 3 4 who is following u
        default:""
    },
    following:{
        type:Array, //will add the number like 1 2 3 4 who is following u
        default:""
    },

    isAdmin:{
        type:Boolean,
        default:false
    },

    desc:{
        type:String,
        max:100
    },
    city:{
        type:String,
        max:100
    },

    // hometown
    from:{
        type:String,
        max:100
    },
    relatioship:{
        type:Number, //[1:married,2:single]
        enum:[1,2,3]
    }

},
// will create a timestamp which will get updated whenever above will get updated 

{timestamps:true}
)


//user is the model name
module.exports=mongoose.model("User",UserSchema);