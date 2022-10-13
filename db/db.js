const mongoose = require("mongoose")
const connection =  mongoose.connect("mongodb+srv://prakprasar:prakprasar@cluster0.camqahr.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("DB Connected")
}).catch((e)=>{
    console.log(e)
})

module.exports = connection;