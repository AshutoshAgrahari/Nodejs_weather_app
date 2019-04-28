//Ref: https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'b2b69a178fbebb8b6a8ae1731002e484';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs')

app.get('/',function (req, res) {	
	res.render('index', {weather: null, error: null});	
})

app.post('/',function (req, res) {	
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

	request(url, function (err, response, body) {
		if(err){
			res.render('index', {weather: null, error: 'Error, please try again'});
		} else {
			let weather = JSON.parse(body)
			if(weather.main == undefined){
				res.render('index', {weather: null, error: 'Error, please try again'});
			} else {
				let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
				res.render('index', {weather: weatherText, error: null});				
			}
		}
	});
	//console.log(req.body.city);
	//res.render('index');	
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})