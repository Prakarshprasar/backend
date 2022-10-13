const User =require("../Models/userSchema")
const {Router}=require("express");

const userRouter=Router();

userRouter.post("/:id",(req,res)=>{
    let username=req.params.id;


    axios.get(`https://api.github.com/users/${username}`)
    .then((response)=>{
        const user= new User(response);
        user.save()
        return res.send("response recieved")
    })
    .catch((err)=>{
        console.log("error occured")
        return res.send("error recieved")
    })
})
userRouter.get("/users",async(req,res)=>{

    const user = await  User.find({})
    res.send(user)
})
module.exports=userRouter;