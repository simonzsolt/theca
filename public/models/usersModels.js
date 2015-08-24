var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username:   { type: 'String', required: true},
    nickname:   { type: 'string', unique: true, required: true },
    first_name: { type: 'String', required: true},
    last_name:  { type: 'String', required: true},
    password:   String,
    role:       String,
    created_at: {
            type:       Date, 
            default:    Date.now()
        }, // létrehozva;
    },

    {collection: 'user'} // specify collection
);

// makes db connection and passport config easier
Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);