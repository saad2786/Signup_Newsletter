const express = require("express")
const Sib = require("@mailchimp/mailchimp_marketing")
const bodyParser = require("body-parser")
const https = require("https")
const requests = require("request")
const app = express()
const API_KEY = " saad:45899d4c7c860e624a222ba0f2f70fd3-us21"
const URL = "https://us21.api.mailchimp.com/3.0/lists/4666793c23"
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/signup.html")
})
app.post("/",function(req,res)
{
    const Fname=req.body.first
    const Lname=req.body.last
    const email=req.body.email

    const data = {
        members: [
            {
                email_address:email,
                status: "subscribed",
                    merge_feilds:
                    {
                    FNAME :Fname,
                    LNAME :Lname
                    }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const option = {
        method : "POST",
        auth : API_KEY
    }
    const url = URL
    const request = https.request(url,option,function(response){
      if(response.statusCode === 200)
      {
              res.sendFile(__dirname+"/success.html")
              
      }
      else
      {
res.sendFile(__dirname+"/failure.html")
             
      }
        response.on("data",function(data){
    console.log(JSON.parse(data))
});
    });
    request.write(jsonData);
    request.end();
})
app.post("/failure",function (req,res) {
    res.redirect("/")
  })
app.post("/success",function (req,res) {
    res.redirect("/")
  })
app.listen(3000,function(){
    console.log("server is running on port 3000.")
})

//API key
//45899d4c7c860e624a222ba0f2f70fd3-us21
//Audiance ID
//4666793c23