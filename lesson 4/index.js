/*const http = require("http")
const {parse} = require("url")
const server = http.createServer((request,response) => {
    if(request.method === "GET"){
        const query = parse(request.url);
        console.log(query)
        response.end("query")
    }
})

server.listen(80)

server.on("listening", ()=>{
    console.log("server's ready")
})

 */
// make life much much much easier
const express = require("express")
const app = express()

app.get("/",(req,res) =>{
    res.render('./index.ejs', {})

})
app.get("/login",(req,res) =>{
        res.render('./login.ejs', {})
})
app.post("/", (req,res) =>{

})

app.listen(80).on("listening", ()=>{
    console.log("listening")
})