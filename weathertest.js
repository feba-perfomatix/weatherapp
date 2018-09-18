var express        =         require("express");
var request	   =	     require('request');
var bodyParser     =         require("body-parser");
var app            =         express();
const port = 3000;

	let obj = {
	  weather: null,
	  error: null
	};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')



app.get('/',function(req,res){
 res.sendFile ("/home/feba/weatherapp/myindex.html");
});


app.post('/weather',function(req,res)
{
	let city = req.body.place;
	console.log("city>>>"+city);
  	let url = `http://api.apixu.com/v1/current.json?key=3c5618e8558e4838adf54241181809&q=${city}`
	request(url, function (error, response, body) {
	if(error){
	      obj.error = 'Error, please try again';
		console.log( 'Error, please try again');
		res.send(obj.error);
	      //response.render('myindex', obj);
	    }
	else
	{
	let weather = JSON.parse(body);
	console.log("WEATHER:::"+body);
	obj.weather = `It is ${weather.current.temp_c} degrees in ${weather.location.name}!`;
	console.log(">>>>"+obj.weather);
//res.writeHead(200, { 'Content-Type': 'application/json' });
	res.send(obj);
	}
	
	})
})
////////////////////////////////


//const request = require('request');

/*request('https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=0a22b955995e9884edc21f3f916ba2b2', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});*/

/////////////////////////////////

app.listen(port,function(){
  console.log("Server Started on PORT 3000");
})
