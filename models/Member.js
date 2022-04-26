const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    role: { type: String },
    name: { type: String },
    spouse: { type: String},
    father: { type: String },
    mother: { type: String },
    children: [
        {
            name: String
        }
    ]
});

module.exports = mongoose.model('Member', memberSchema);