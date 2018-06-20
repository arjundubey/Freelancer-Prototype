var express = require('express');
var router = express.Router();


router.post('/add', function(req,res)
{
	
	var result = parseFloat(req.body.n1) + parseFloat(req.body.n2);

	res.json({ 'result' : result });
});

router.post('/subtract', function(req,res)
{
	
	var result = parseFloat(req.body.n1) - parseFloat(req.body.n2);


	res.json({ 'result' : result });
});

router.post('/multiply', function(req,res)
{
	
	var result = parseFloat(req.body.n1) * parseFloat(req.body.n2);


	res.json({ 'result' : result });
});

router.post('/divide', function(req,res)
{
	
	var result = parseFloat(req.body.n1) / parseFloat(req.body.n2);


	res.json({ 'result' : result });
});

module.exports = router;
