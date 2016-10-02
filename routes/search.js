var express = require('express');
    router = express.Router(),
    mongoose = require('mongoose'),
    Theca = mongoose.model('Theca', 'recs');

router.get('/search/q=:q', function (req, res) {
	Theca.find({ '$text' : { '$search' : req.params.q } }).
	exec(function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.json(data);
		}
	})
})


router.get('/search/q=:q/gte=:gte', function (req, res) {
	Theca.find({ '$text' : { '$search' : req.params.q } }).
	where('doc_date_from').gte(req.params.gte).
	exec(function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.json(data);
		}
	})
})

router.get('/search/q=:q/lte=:lte', function (req, res) {
	Theca.find({ '$text' : { '$search' : req.params.q } }).
	where('doc_date_to').lte(req.params.lte).
	exec(function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.json(data);
		}
	})
})

router.get('/search/q=:q/gte=:gte/lte=:lte', function (req, res) {
	
	// res.send(req.params.q);

	// var qText = {  '$text' : { '$search' : req.params.q },	}; 

	// var qGte = { 'doc_date_from' : { '$gte' : req.params.gte } };	

	// var qLte = { 'doc_date_to' : { '$lte' : req.params.lte } };

	var qTextdate = { 
		'$text' : { '$search' : req.params.q },
		'doc_date_from' : { '$gte' : req.params.gte },
		'doc_date_to' : { '$lte' : req.params.lte }
	}

	Theca.find().
		find({ '$text' : { '$search' : req.params.q } }).
		where('doc_date_from').gte(req.params.gte).
		where('doc_date_to').lte(req.params.lte).
		exec(function(err, data){
			if(err){
				res.send(err);
			}
			else{
				res.json(data);
			}
		})

});

module.exports = router;