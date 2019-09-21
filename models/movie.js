const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 120
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    actors:[{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Actor'
    //  required: true
     }]
});

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;