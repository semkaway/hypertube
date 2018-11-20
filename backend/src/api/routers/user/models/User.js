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
});

export const User = mongoose.model('user', userSchema);
