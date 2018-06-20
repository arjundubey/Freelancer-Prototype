var express = require('express');
var router = express.Router();
var fs = require('fs');
var testFolder = './routes/';

router.get('/test',function (req,res) {

});

router.post('/listDir', function(req,res)
{
	var response = "";
	testFolder = req.param('dir');
	console.log(testFolder);
	fs.readdir(testFolder, function (err, files) 
	{
		console.log(files.length);
		console.log(files);
		for(var i=0;i<files.length;i++)
		{
			response += files[i]+"<br>";
		}
		res.send(response);
	});
});

module.exports = router;