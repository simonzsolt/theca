var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_MONGODB_DB_NAME;

// session storage connection
var connection = mongoose.
    // createConnection("mongodb://localhost/theca", function(err) {
    createConnection(connection_string, function(err) {
        if (err) {
            console.log('DB connection error:' + err);
        }
    else {return;}
});


var Theca = new mongoose.Schema({

    bh_name: String,
    origin: String,
    doc_date_from: Date,
    doc_date_to: Date,
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
    rec_pub: [{ item: String }],
    book_num_from: Number,
    book_num_to: Number,
    book_title_num_from: Number,
    book_title_num_to: Number,
    bh_num: String,
    rec_lang: String,
    inherit: String,
    vol_missing_num: Number,
    bibl: [{ item: String }],
    note: String,
    text: String,
    prog: String,
    created_at:
        {
            type: Date, 
            default: Date.now()
        }, // létrehozva
    created_by: String, // felhasználónév - USER API!
    last_mod:   
        {
            type: Date
        }, // utolsó módosítás

    mod_by:     String, 
    
    },
    
    {collection: 'recs'} // specify collection
);

mongoose.model('Theca', Theca);