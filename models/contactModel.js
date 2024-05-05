const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    qns:{
        type: String,
        required: true
    },
    optional:{
        type: String,
    }

})

const model = new mongoose.model("contact", contactSchema);

module.exports = model;