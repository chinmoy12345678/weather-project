const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({entended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");

    
})

app.post("/",function(req,res){

    const query = req.body.cityName;
    const apiKey = "4a31d5829ff1feaef3d2e084d9718179";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            
            const weatherDescription = weatherData.weather[0].description;
            res.write("<p>The weather is currently "+ weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is "+ temp + " degree celsius</h1>");
            res.send();
        });
    });
});



app.listen(3000, function(){
    console.log("My server is running on port 3000");
});

