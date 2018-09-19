var express        =         require("express");
var request	   =	     require('request');
var bodyParser     =         require("body-parser");
var app            =         express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')



app.get('/',function(req,res){
 res.sendFile ("/home/feba/weatherapp/myindex.html");
});

//post is handled.api call performed and data sent back using res.send()
app.get('/weather',function(req,res)
{
	var obj = {
	  weather: null,
	  error: null};

		var city = req.query.place;
		console.log("city>>>"+city);
  	let url = `http://api.apixu.com/v1/current.json?key=3c5618e8558e4838adf54241181809&q=${city}`
		request(url, function (error, response, body) {
								/*if(body==""){
											obj.error = JSON.parse(body).error.message;
									console.log( 'Error, please try again:::'+obj.error);
									res.send(obj);
											//response.render('myindex', obj);
										}
								else*/
							//	{
			var result = JSON.parse(body);
			console.log("WEATHER:::"+result);
			if(result.hasOwnProperty("error")){
					obj.error=result.error.message;
			}
			else{
					obj.weather = `It is ${result.current.temp_c} degrees in ${result.location.name}!`;
					console.log(">>>>"+obj.weather);
			}
			res.send(obj);
		});
});
									//res.writeHead(200, { 'Content-Type': 'application/json' });
		
									//	}
	
								//obj.error="My Error Msg";
								//res.send(obj);
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
});
