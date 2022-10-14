const User =require("../Models/userSchema")
const {Router}=require("express");
const axios=require("axios")

const userRouter=Router();

userRouter.post("/:id",async(req,res)=>{
    let username=req.params.id;

    axios.get(`https://api.github.com/users/${username}`)
    .then(async(response)=>{
        
        
        let arr1=[];
        let arr2=[]
        axios.get(response.data.followers_url).then((r)=>{
            arr1= r.data;
            let url2=response.data.following_url.trim().split("");
            for(let i=0;i<13;i++){
                url2.pop()
            }
            let url=url2.join("")
            
            axios.get(url).then(async(r)=>{
                arr2=r.data;
                let arr=[];
                if(arr1.length<arr2.length){
                    for(let i=0;i<arr1.length;i++){
                        for(let j=0;j<arr2.length;j++){
                            if(arr1[i].login==arr2[j].login){
                                arr.push(arr1[i].login);
                                break;
                            }
                        }
                    }
                }else{
                    for(let i=0;i<arr2.length;i++){
                        for(let j=0;j<arr1.length;j++){
                            if(arr2[i].login==arr1[j].login){
                                arr.push(arr2[i].login);
                                break;
                            }
                        }
                    }
                }
                
               
                const user=await new User(response.data)
                user.friends=arr;
                user.save()
                return res.send(user)
                
            })
            
        })
        

        // console.log(arr1,arr2)
        
        
        
        
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
userRouter.delete("/users/:id",async(req,res)=>{
    let login=req.params.id
    
   

    // const note = await User.find({friends:friends})
    
    await User.deleteMany({login:login});
    return res.send("deleted")
    

})
module.exports=userRouter;