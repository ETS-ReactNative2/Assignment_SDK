const express = require("express")
const app = express()
const helmet = require("helmet") // to protect from mal-practioners (attacks)
const cors = require("cors")

app.use(express.json()) //middleware
app.use(express.urlencoded({ extended: true })) //middleware

app.use(helmet())
app.use(cors())

app.use("/s3", require("./routes/s3"))
app.use("/ec2", require("./routes/ec2"))


app.get("/", (req, res) => { // root path
    res.send("<h1>Welcome to Home CRUD</h1>")
})

// app.get('/list', async(req,res)=>{
//     let data;
//     list(function(fn){
//         data=fn
//     })
//     // data.forEach(element => {
//     //     name = element.Name;
//     // });
//     res.send(data)
//     // console.log(data)
// })

app.listen(3500, () => {
    console.log("Server Started")
})