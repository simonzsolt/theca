var express = require('express');
    router = express.Router(),
    mongoose = require('mongoose'),
    elasticsearch = require('elasticsearch'),
    Theca = mongoose.model('Theca', 'recs');

// start es client
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error', // error, warning, info, debug, trace
    apiVersion: '1.7'
});

// test es client
client.ping({
    // ping usually has a 3000ms timeout 
    requestTimeout: Infinity,

    // undocumented params are appended to the query string 
    hello: "elasticsearch!"
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('*ES: All is well');
    }
});

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
                rec.origin  = req.body.origin;

                rec.doc_date_from = req.body.doc_date_from;
                rec.doc_date_to   = req.body.doc_date_to;

                rec.source_type = req.body.source_type;

                rec.ownership = req.body.ownership;

                rec.poss_name      = req.body.poss_name;
                rec.poss_name_var  = req.body.poss_name_var;
                rec.poss_origin    = req.body.poss_origin;
                rec.poss_date      = req.body.poss_date;
                rec.poss_place     = req.body.poss_place;
                rec.poss_occ       = req.body.poss_occ;
                rec.poss_nat       = req.body.poss_nat;

                rec.rec_name       = req.body.rec_name;
                rec.rec_prev_place = req.body.rec_prev_place;
                rec.rec_curr_place = req.body.rec_curr_place;
                rec.rec_prev_score = req.body.rec_prev_score;
                rec.rec_pub        = req.body.rec_pub;

                rec.book_num_from          = req.body.book_num_from;
                rec.book_num_to            = req.body.book_num_to;
                rec.book_title_num_from    = req.body.book_title_num_from;
                rec.book_title_num_to      = req.body.book_title_num_to;

                rec.bh_num   = req.body.bh_num;
                rec.rec_lang = req.body.rec_lang;
                rec.inherit  = req.body.inherit;

                rec.vol_missing_num = req.body.vol_missing_num;

                rec.bibl = req.body.bibl;
                rec.note = req.body.note;
                rec.text = req.body.text;
                rec.prog = req.body.prog;
                
                created_at = req.body.created_at; // létrehozva
                created_by = req.body.created_by;            
                last_mod   = Date.now();           
                mod_by     = req.body.mod_by;

            rec.save(function(err, doc){
                if(err)
                    res.send(err);
                res.json({ msg : 'data sent!'});

                // index new rec in ES
                client.create({
                    index: 'theca',
                    type: 'recs',
                    body: {

                        id: doc.id,
                        bh_name : req.body.bh_name,
                        origin  : req.body.origin,

                        doc_date_from : req.body.doc_date_from,
                        doc_date_to   : req.body.doc_date_to,

                        source_type : req.body.source_type,

                        ownership : req.body.ownership,

                        poss_name      : req.body.poss_name,
                        poss_name_var  : req.body.poss_name_var,
                        poss_origin    : req.body.poss_origin,
                        poss_date      : req.body.poss_date,
                        poss_place     : req.body.poss_place,
                        poss_occ       : req.body.poss_occ,
                        poss_nat       : req.body.poss_nat,

                        rec_name       : req.body.rec_name,
                        rec_prev_place : req.body.rec_prev_place,
                        rec_curr_place : req.body.rec_curr_place,
                        rec_prev_score : req.body.rec_prev_score,
                        rec_pub        : req.body.rec_pub,

                        book_num_from          : req.body.book_num_from,
                        book_num_to            : req.body.book_num_to,
                        book_title_num_from    : req.body.book_title_num_from,
                        book_title_num_to      : req.body.book_title_num_to,

                        bh_num   : req.body.bh_num,
                        rec_lang : req.body.rec_lang,
                        inherit  : req.body.inherit,

                        vol_missing_num : req.body.vol_missing_num,

                        bibl : req.body.bibl,
                        note : req.body.note,
                        text : req.body.text,
                        prog : req.body.prog
                    }

                }, function (error, response) {
                    if (error){
                        console.log(error);
                    } else{
                        client.count({
                            index: 'theca'
                        }, function(err, res){

                            if (err) {
                                console.log(err);
                            } else {
                                console.log(res);
                            }
                        })
                    }
                });
                
                // console.log('_id: ' + doc.id);

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

                    var docId = req.params.id;

                    if (err)
                        res.send(err);

                    res.json({ message : 'data deleted' });

                    // delete index from ES
                    client.search({
                        index: 'theca',
                        body: {
                            query: {
                                match: {
                                    _all: docId
                                }
                            },
                        },
                    }, function (err, findings) {
                        if (err) {
                            console.log(err);
                        } else {
                           console.log(findings.hits.hits[0]._id);
                        }

                        client.delete({
                            index: 'theca',
                            type: 'recs',
                            id: findings.hits.hits[0]._id
                        }, function (error, response) {
                            if (err) {
                            console.log(err);
                            } else {
                               console.log('index deleted!');
                            }
                        });

                    }); // client.search, cb
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

                var docId = req.params.id;

                rec.bh_name = req.body.bh_name;
                rec.origin  = req.body.origin;

                rec.doc_date_from = req.body.doc_date_from;
                rec.doc_date_to   = req.body.doc_date_to;

                rec.source_type = req.body.source_type;

                rec.ownership = req.body.ownership;

                rec.poss_name      = req.body.poss_name;
                rec.poss_name_var  = req.body.poss_name_var;
                rec.poss_origin    = req.body.poss_origin;
                rec.poss_date      = req.body.poss_date;
                rec.poss_place     = req.body.poss_place;
                rec.poss_occ       = req.body.poss_occ;
                rec.poss_nat       = req.body.poss_nat;

                rec.rec_name       = req.body.rec_name;
                rec.rec_prev_place = req.body.rec_prev_place;
                rec.rec_curr_place = req.body.rec_curr_place;
                rec.rec_prev_score = req.body.rec_prev_score;
                rec.rec_pub        = req.body.rec_pub;

                rec.book_num_from          = req.body.book_num_from;
                rec.book_num_to            = req.body.book_num_to;
                rec.book_title_num_from    = req.body.book_title_num_from;
                rec.book_title_num_to      = req.body.book_title_num_to;

                rec.bh_num   = req.body.bh_num;
                rec.rec_lang = req.body.rec_lang;
                rec.inherit  = req.body.inherit;

                rec.vol_missing_num = req.body.vol_missing_num;

                rec.bibl = req.body.bibl;
                rec.note = req.body.note;
                rec.text = req.body.text;
                rec.prog = req.body.prog;
                
                created_at = req.body.created_at; // létrehozva
                created_by = req.body.created_by;            
                last_mod   = Date.now();           
                mod_by     = req.body.mod_by;

                rec.save(function(err, doc){
                    console.log('updating data...');
                    if(err)
                        res.send(err);
                    res.json({ msg : 'update succesfull'});


                    client.search({
                        index: 'theca',
                        body: {
                            query: {
                                match: {
                                    _all: docId
                                }
                            },
                        },
                    }, function (err, findings) {
                        if (err) {
                            console.log(err);
                        } else {
                           console.log(findings.hits.hits[0]._id);
                        }

                        client.update({
                            index: 'theca',
                            type: 'recs',
                            id: findings.hits.hits[0]._id,
                            body: {
                                // put the partial document under the `doc` key
                                doc: {
                                    bh_name : req.body.bh_name,
                                    origin  : req.body.origin,

                                    doc_date_from : req.body.doc_date_from,
                                    doc_date_to   : req.body.doc_date_to,

                                    source_type : req.body.source_type,

                                    ownership : req.body.ownership,

                                    poss_name      : req.body.poss_name,
                                    poss_name_var  : req.body.poss_name_var,
                                    poss_origin    : req.body.poss_origin,
                                    poss_date      : req.body.poss_date,
                                    poss_place     : req.body.poss_place,
                                    poss_occ       : req.body.poss_occ,
                                    poss_nat       : req.body.poss_nat,

                                    rec_name       : req.body.rec_name,
                                    rec_prev_place : req.body.rec_prev_place,
                                    rec_curr_place : req.body.rec_curr_place,
                                    rec_prev_score : req.body.rec_prev_score,
                                    rec_pub        : req.body.rec_pub,

                                    book_num_from          : req.body.book_num_from,
                                    book_num_to            : req.body.book_num_to,
                                    book_title_num_from    : req.body.book_title_num_from,
                                    book_title_num_to      : req.body.book_title_num_to,

                                    bh_num   : req.body.bh_num,
                                    rec_lang : req.body.rec_lang,
                                    inherit  : req.body.inherit,

                                    vol_missing_num : req.body.vol_missing_num,

                                    bibl : req.body.bibl,
                                    note : req.body.note,
                                    text : req.body.text,
                                    prog : req.body.prog
                                }
                            }
                        }, function (error, response) {
                            if (error){
                                console.log(error);
                            } else {
                                console.log('index updated!');
                            }
                            })

                        

                    }); // client.search, cb
                })
            })
        }
    }); 

module.exports = router;