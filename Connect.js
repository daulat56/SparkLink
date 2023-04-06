const mongoose=require("mongoose")

// mongoose.set('runValidators',true);

mongoose.connect("mongodb+srv://20bcs037:987654321@cluster0.v21lhgr.mongodb.net/test",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected");
}).catch((e)=>{
    console.log(e)
    console.log("not connected")
})