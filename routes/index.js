var express = require('express');
    router = express.Router(),
    mongoose = require('mongoose'),
    Theca = mongoose.model('Theca', 'recs');

router.get('/', function (req, res, next) {
  res.render('index', {title: "THECA"});
});

// GET all data
router.route('/data')
	.get(function(req, res){
		Theca.find(function(err, data){
			if(err){
				console.log('err: ' + err);
				res.send(err);
			}
			else{
				res.json(data);
			}
		})
	})

// POST new data
	.post(function(req, res){

         if (!req.isAuthenticated() || req.user.role == 'user') {
                res.sendStatus(401);
            }

        else {

    		var rec = new Theca();

    		rec.bh_name = req.body.bh_name;
            rec.origin 	= req.body.origin;
            rec.doc_date_from 	= req.body.doc_date_from;
            rec.doc_date_to 	= req.body.doc_date_to;
            rec.source_type 	= req.body.source_type;
            rec.ownership = req.body.ownership;
            rec.poss_name = req.body.poss_name;
            rec.poss_name_var 	= req.body.poss_name_var;
            rec.poss_origin 	= req.body.poss_origin;
            rec.poss_date 	= req.body.poss_date;
            rec.poss_place 	= req.body.poss_place;
            rec.poss_occ = req.body.poss_occ;
            rec.poss_nat = req.body.poss_nat;
            rec.rec_name = req.body.rec_name;
            rec.rec_prev_place = req.body.rec_prev_place;
            rec.rec_curr_place = req.body.rec_curr_place;
            rec.rec_prev_score = req.body.rec_prev_score;
            rec.rec_pub = req.body.rec_pub;
            rec.book_num_from 	= req.body.book_num_from;
            rec.book_num_to 	= req.body.book_num_to;
            rec.book_title_num_from = req.body.book_title_num_from;
            rec.book_title_num_to 	= req.body.book_title_num_to;
            rec.bh_num 	 = req.body.bh_num;
            rec.rec_lang = req.body.rec_lang;
            rec.inherit  = req.body.inherit;
            rec.vol_missing_num = req.body.vol_missing_num;
            rec.bibl = req.body.bibl;
            rec.note = req.body.note;
            rec.text = req.body.text;
            rec.prog = req.body.prog;

    		rec.save(function(err){
    			if(err)
    				res.send(err);
    			res.json({ msg : 'data sent!'});
    		});
    		console.log('data saved!');
        };
	});

// GET data by ID
router.route('/data/:id')
	.get(function(req, res){
		Theca.findOne({ _id : req.params.id }, function(err, data){
			if (err) {
				res.send(err);
			}
			else{
				res.json(data);
			};
		})
	})

// DELETE by ID
	.delete(function(req, res){

        if (!req.isAuthenticated() || req.user.role == 'user') {
                res.sendStatus(401);
            }

        else {

    		Theca.remove({ _id : req.params.id  },
    			function(err, next){
    				if (err)
                	    res.send(err);

                    res.json({ message : 'data deleted' });
    			}
    		);
        }
	})

// PUT data
	.put(function(req, res){

        if (!req.isAuthenticated() || req.user.role == 'user') {
                res.sendStatus(401);
            }

        else {


    		Theca.findOne({ _id: req.params.id }, function(err, rec){
    			if(err)
    				res.send(err);

    			rec.bh_name = req.body.bh_name;
    	        rec.origin 	= req.body.origin;
    	        rec.doc_date_from 	= req.body.doc_date_from;
    	        rec.doc_date_to 	= req.body.doc_date_to;
    	        rec.source_type 	= req.body.source_type;
    	        rec.ownership = req.body.ownership;
    	        rec.poss_name = req.body.poss_name;
    	        rec.poss_name_var 	= req.body.poss_name_var;
    	        rec.poss_origin 	= req.body.poss_origin;
    	        rec.poss_date 	= req.body.poss_date;
    	        rec.poss_place 	= req.body.poss_place;
    	        rec.poss_occ = req.body.poss_occ;
    	        rec.poss_nat = req.body.poss_nat;
    	        rec.rec_name = req.body.rec_name;
    	        rec.rec_prev_place = req.body.rec_prev_place;
    	        rec.rec_curr_place = req.body.rec_curr_place;
    	        rec.rec_prev_score = req.body.rec_prev_score;
    	        rec.rec_pub = req.body.rec_pub;
    	        rec.book_num_from 	= req.body.book_num_from;
    	        rec.book_num_to 	= req.body.book_num_to;
    	        rec.book_title_num_from = req.body.book_title_num_from;
    	        rec.book_title_num_to 	= req.body.book_title_num_to;
    	        rec.bh_num 	 = req.body.bh_num;
    	        rec.rec_lang = req.body.rec_lang;
    	        rec.inherit  = req.body.inherit;
    	        rec.vol_missing_num = req.body.vol_missing_num;
    	        rec.bibl = req.body.bibl;
    	        rec.note = req.body.note;
    	        rec.text = req.body.text;
    	        rec.prog = req.body.prog;

    	        rec.save(function(err){
    				console.log('updating data...');
    				if(err)
    					res.send(err);
    				res.json({ msg : 'update succesfull'});
    			})
    		})
        }
	});	

module.exports = router;