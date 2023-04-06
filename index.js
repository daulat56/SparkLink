const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const morgan=require("morgan")
const helmet=require("helmet")
const userRoutes=require("./routes/users")
const authRoutes=require("./routes/auth")
const postRoutes=require("./routes/posts")

dotenv.config();

// will access the connect which will connect the data base to the port
require("./Connect.js");

 //middleware

app.use(express.json());
app.use(helmet());  // secure your Express apps by setting various HTTP headers.
app.use(morgan("comman")); //middleware used to secure the http req


//use the userroute or users.js page and will route to the user.js 
app.use("/api/users" ,userRoutes);

// app.get("/api/users",(req,res)=>{
//     res.send("welcome to home")
// })

// app.get("/auth",(req,res)=>{
//     res.send("good to go authentication part")
// })
// instead of above call we can directly use middleware

app.use("/api/auth" ,authRoutes)
app.use("/api/post" ,postRoutes)

app.listen(8000,()=>{
    console.log("server is running in port ");
})

