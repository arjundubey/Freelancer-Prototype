var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var user_db = {

	"abhin" : "123456",
	"alex" : "qwerty",
	"tester" : "@tester",

 }


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Login Routes

router.get('/login', function(req, res, next) {
  res.send('Welcome to login page .....');
});


router.post('/login', function(req, res, next) {

	let username =  req.body.username;
	let password =  req.body.password;

	let message = {};

	if( typeof username == "undefined" || typeof password === "undefined" || username == "" || password == "" ) {

		res.status(401);

	}
			
	if( typeof username == "undefined"  || username == "" ) {
		
		message["error"] = [] ;
		message["error"].push("Please enter username !");
		res.send(message);
		return;
	}

	if( typeof password == "undefined"  || password == "" ) {
		
		if(typeof message.error == "undefined" )
		 	message['error'] = [];	

		message["error"].push("Please enter password !");
		res.send(message);
		return;	
	}


	if( username in user_db && user_db[username] == password ) {
		message['success'] = "Login successful !";
	} else {
		res.status(401);
		message['error'] = " Invalid login credentials ! ";
	}


	res.send(message);
});


// Registration routes

router.get('/register', function(req, res, next) {
  res.send('Welcome to registration page....');
});



router.post('/register', function(req, res, next) {

	let name =  req.body.name;
	let email =  req.body.email;
	let username =  req.body.username;
	let password =  req.body.password;
	let flag = false;
	let message = {};
			
	if( name == "" || email == "" || password == "" || username == "" ) {
		flag = true;
	}


	if( flag == false ) {
		message['success'] = "Registration successful";
	} else {
		message['error'] = " Some form details were not filled";
	}


	res.send(message);
});

module.exports = router;
