import mongoose from 'mongoose'

const stringNull = {type: String, default: null};
const boolFalse  = {type: Boolean, default: false};

const userSchema = new mongoose.Schema({
    email: stringNull,
    pendingEmail: stringNull,
    githubId: stringNull,
    intraId: stringNull,
    password: stringNull,
    first: {type: String, required: true},
    last: stringNull,
    locale: String,
    activated: boolFalse,
    activationToken: stringNull,
    resetPasswordToken: stringNull,
    image: stringNull,
    watchedMovies: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    comments: [{
        movieId: String,
        date: Date,
        text: String,
    }],
});

userSchema.virtual('watchedIds').get(function () {
    return Object.keys(this.watchedMovies);
});

userSchema.virtual('commentedIds').get(function () {
    return this.comments.map(comment => comment.movieId)
        .filter((id, index, array) => array.indexOf(id) === index);
});

export const User = mongoose.model('user', userSchema);
