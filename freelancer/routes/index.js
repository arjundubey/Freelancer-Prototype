var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Project = require('../models/Project');
var Bid = require('../models/Bid');

var bcrypt = require('bcrypt');


var multer = require('multer');
var path = require('path');

var slug = require('slug')




var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') 
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });



router.post('/bids', function(req,res)
{

	// req.session.user.id
	Bid.findAll({ where : { user_id:req.session.user.id }  , include : [User,Project]})
		.then(bids => { 

			res.json( bids);
			res.end();	

		});

	
});


/**
 * Projects View
 */


router.post('/projects', function(req,res)
{

	var opts = { include : [Bid,User] };

	if(req.body.filter && req.session.user)
		opts['where'] =  { user_id:req.session.user.id } 

	Project.findAll(opts).then(projects => {
  		res.json(projects);
  		res.end();
	});

	
});



router.get('/test', function(req,res)
{

	var opts = {  where : { user_id:req.session.user.id , status : 'CLOSED' } };

	Project.findAll(opts).then(projects => {

		User.findAll().then(users => {

			Bid.findAll().then(bids => { 


				let tempusers = {};
				let tempbids = {};
				let tempprojects = [];

				for (var i = 0; i<users.length;i++) {
					tempusers["u"+users[i].id] = users[i];
				}

				for (var i = 0; i<bids.length;i++) {
					tempbids["u"+bids[i].id] = bids[i];
				}

				for (var i = 0; i<projects.length;i++) {
					tempprojects[i] = projects[i];
					tempprojects[i].dataValues.bid_winner_details = tempusers["u"+tempprojects[i].bid_winner];
					tempprojects[i].dataValues.win_bid_details = tempbids["u"+tempprojects[i].win_bid_id];
				}


				res.json(tempprojects);
	  			res.end();	

  			});

		});

  		
	});

	
});


router.post('/dashprojects', function(req,res)
{

	var opts = {  where : { user_id:req.session.user.id , status : 'CLOSED' } };

	Project.findAll(opts).then(projects => {

		User.findAll().then(users => {

			Bid.findAll().then(bids => { 


				let tempusers = {};
				let tempbids = {};
				let tempprojects = [];

				for (var i = 0; i<users.length;i++) {
					tempusers["u"+users[i].id] = users[i];
				}

				for (var i = 0; i<bids.length;i++) {
					tempbids["u"+bids[i].id] = bids[i];
				}

				for (var i = 0; i<projects.length;i++) {
					tempprojects[i] = projects[i];
					tempprojects[i].dataValues.bid_winner_details = tempusers["u"+tempprojects[i].bid_winner];
					tempprojects[i].dataValues.win_bid_details = tempbids["u"+tempprojects[i].win_bid_id];
				}


				res.json(tempprojects);
	  			res.end();	

  			});

		});

  		
	});

	
});



router.post('/project', function(req,res)
{

	Project.findOne({
	  where: {
	    slug: req.body.slug
	  }
	}).then(row => {

		var data= row;

		Bid.findAll({ where : { project_id: data.id }  , include : [User]})
		.then(bids => { 

			res.json({ data , bids });
			res.end();	

		});
		
	});

	
});



/**
 * Ajax handler
 */

router.post('/ajax',upload.single('file'), function(req,res)
{
	let data = '', response = '';

	// console.log( req.body);

	switch(req.body.type) {

		case 'final-bid' :

			Project.update({ bid_winner : req.body.userid,  win_bid_id : req.body.bidid , status :'CLOSED' }, { where : { id : req.body.projectid }  })
				.then( result =>{

					res.json(result);
					res.end();

				});

		break;

		case 'user-details' :
			
			User.findOne({
			  where: {
			    id: req.session.user.id
			  }
			}).then(row => {

				res.json(row);
				res.end();	
				
			});


		break;
		case 'updateuser-details' :

		

		var pass_string = '';
		var user = {

			first_name: req.body.first_name ,
			last_name: req.body.last_name ,
			avatar:  req.body.proxyavatar,
			skills: req.body.skills ,
			phone: req.body.phone ,
			about: req.body.about ,
			email: req.body.email ,
			type: req.body.utype ,
			id: req.body.id ,

		}	

		if(req.body.password !=="") {
			pass_string = req.body.password;			
		}

		if(req.file)
			user['avatar'] = req.file.filename;
			

		bcrypt.hash(pass_string, 10, function(err, hash) {
				
				if(pass_string!=="")
					user['password'] = hash;

				console.log(user);

				User.update(user, { where : { id : user.id }  })
				.then( result =>{

					res.json(result);
					res.end();

				});

			});
		

		

		break;	

		case 'create-project' :


			var filename = '';

			if(res.file)
				filename = req.file.filename;

			data = {

				name :req.body.name ,
				slug : slug(req.body.name),
				description :req.body.description ,
				skills :req.body.skills ,
				min_budget :req.body.min_budget ,
				max_budget :req.body.max_budget ,
				file : filename,
				user_id :req.session.user.id,
				status : 'OPEN',
				bid_winner : 0

			};

			
			Project.create(data)
			.then( result =>{

					res.json(result);
					res.end();

			});

						

		break;

		case 'add-bid' :

			data = req.body.formData;

			 Bid.create(data)
			.then( result =>{

				Bid.findOne({ where : { id: result.id }  , include : [User]})
				.then(bid => { 

					res.json(bid);
					res.end();	

				});

			});

		break;

		case 'register-user':  
			
			data = req.body.formData;

			bcrypt.hash(data.password, 10, function(err, hash) {
				
				let mdata = data;
				mdata.password = hash;

				User.create(data)
				.then( result =>{

					res.json(result);
					res.end();

				});

			});


		break;

		case 'login-user':  
			
			var tdata = req.body.formData;
			req.session.logged = false;

			User.findOne({ where: { email: tdata.email } })
			.then(user => {

				if(!user) {
					res.json({ success : false });
					res.end();

					return;		
				}
				
				bcrypt.compare(tdata.password, user.password).then(function(result) { 

					var output = { success : false };
					if(result === true) {
						var tuser = user;
						
						delete tuser.password;

						req.session.user = tuser;
						req.session.logged = true;

						req.session.save();

						output = { 
							"success" : true,
							"first_name" : user.first_name,
							"last_name" : user.last_name,
							"email" : user.email,
							"type" : user.type,
							"id" : user.id

						};

						console.log(output);
					} 

					res.json(output);
					res.end();

				});

			});



		break;

		case 'session-heartbeat' : 

			var temp = {};
			if(typeof req.session !=="undefined" && 'logged' in req.session && req.session.logged == true) {
				temp['logged'] = true;
				temp['user'] = req.session.user;
			} else {
				temp['logged'] = false;
 			}

			// temp['logged'] = true;
 		// 	temp['user'] = { 
			// 				"success" : true,
			// 				"first_name" : "Abhin",
			// 				"last_name" : "Sharma",
			// 				"email" : "abhin_sh@yahoo.com",
			// 				"type" : "hire",
			// 				"id" : 5

			// 			};

 			res.json(temp);
 			res.end();

		break;

		case 'logout' : 
			
			req.session.user = '';
			req.session.destroy();

			res.end();

		break;

	}
	
});


module.exports = router;
