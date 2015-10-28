var express = require('express');
    router = express.Router(),
    mongoose = require('mongoose'),
    Theca = mongoose.model('Theca', 'recs'),
    elasticsearch = require('elasticsearch'),
    ESQ = require('esq'),
    esq = new ESQ();

// =========================STARTUP & CONFIG=========================================

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

router.route('/search/:q')
    .get(function (req, res) {

        // esq.query('bool', { q: req.params.query  });
        // var query = esq.getQuery();
        // console.log(query);

        client.search({
            index: 'theca',
            body: {
                query: {
                    match: {
                        _all: req.params.q
                    }
                },
                highlight: {
                pre_tags: [ '<span class="highlight">' ],
                post_tags: [ "</span>" ],
                fields : { "*" : {} }
            }
            },
        }, function (err, findings) {
            if (err) {
                console.log(err);
            } else {
                // console.log(res);
                res.send(findings);
            }
        }); // client.search, cb

    }) // .get

/*
Theca.find(function(err, data){
    if(err){
        console.log('err: ' + err);
    }
    else{

        for (var i = data.length - 1; i >= 0; i--) {

            var dataId = data[i]._id.toString();

            // for indexing remove 'doc' object from body
            client.create({

            // client.update({

                index: 'theca',
                type: 'recs',
                // id: 'theca_recs',
                body: {
                    // doc:{
                        "id": data[i]._id,
                        "bh_name": data[i].bh_name,
                        "origin": data[i].origin,
                        "doc_date_from": data[i].doc_date_from,
                        "doc_date_to": data[i].doc_date_to,
                        "source_type": data[i].source_type,
                        "ownership": data[i].ownership,
                        "poss_name": data[i].poss_name,
                        "poss_name_var": data[i].poss_name_var,
                        "poss_origin": data[i].poss_origin,
                        "poss_date": data[i].poss_date,
                        "poss_place": data[i].poss_place,
                        "poss_occ": data[i].poss_occ,
                        "poss_nat": data[i].poss_nat,
                        "rec_name": data[i].rec_name,
                        "rec_prev_place": data[i].rec_prev_place,
                        "rec_curr_place": data[i].rec_curr_place,
                        "rec_prev_score": data[i].rec_prev_score,
                        "rec_pub": data[i].rec_pub,
                        "book_num_from": data[i].book_num_from,
                        "book_num_to": data[i].book_num_to,
                        "book_title_num_from": data[i].book_title_num_from,
                        "book_title_num_to": data[i].book_title_num_to,
                        "bh_num": data[i].bh_num,
                        "rec_lang": data[i].rec_lang,
                        "inherit": data[i].inherit,
                        "vol_missing_num": data[i].vol_missing_num,
                        "bibl": data[i].bibl,
                        "note": data[i].note,
                        "text": data[i].text,
                        "prog": data[i].prog,
                        "created_at": data[i].created_at,
                        "created_by": data[i].created_by, 
                        "last_mod": data[i].last_mod,
                        "mod_by": data[i].mod_by}
                    // }

                }, function (err) {

                    if (err) {
                        console.log(err);
                    } else {

                        client.count({
                            index: 'theca'
                        }, function(err, res){

                            if (err) {
                                console.log(err);
                            } else {
                                // console.log(res);
                            }
                        })
                    }
                }); // client.update (cb)
        }; // for loop (indexing)       
    }
}); // Theca.find()
*/

/*client.search({
    index: 'theca',
    q: 'plébános'
}, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        // console.log(res);
    }
});*/

// =================================QUERIES=========================================

module.exports = router;