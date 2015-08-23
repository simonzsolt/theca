var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Theca = new mongoose.Schema({

    bh_name: String,
    origin: String,
    doc_date_from: String,
    doc_date_to: String,
    source_type: String,
    ownership: String,
    poss_name: String,
    poss_name_var: String,
    poss_origin: String,
    poss_date: String,
    poss_place: String,
    poss_occ: String,
    poss_nat: String,
    rec_name: String,
    rec_prev_place: String,
    rec_curr_place: String,
    rec_prev_score: String,
    rec_pub: String,
    book_num_from: Number,
    book_num_to: Number,
    book_title_num_from: Number,
    book_title_num_to: Number,
    bh_num: Number,
    rec_lang: String,
    inherit: String,
    vol_missing_num: Number,
    bibl: String,
    note: String,
    text: String,
    prog: String
    
    },
    
    {collection: 'recs'} // specify collection
);

mongoose.model('Theca', Theca);