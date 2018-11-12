import mongoose from 'mongoose'

const stringRequired = {type: String, required: true};
const stringNull     = {type: String, default: null};

const userSchema = new mongoose.Schema({
    email: {...stringRequired, unique: true},
    password: stringRequired,
    first: stringRequired,
    last: stringRequired,
    locale: String,
    activation: {type: Boolean, default: false},
    activationToken: stringNull,
    resetPasswordToken: stringNull
});

//userSchema.methods = {
//    authenticate(plaintTextPassword) {
//        return bcrypt.compareSync(plaintTextPassword, this.password);
//    },
//    hashPassword(plaintTextPassword) {
//        if (!plaintTextPassword) {
//            throw new Error('Could not save user');
//        }
//
//        const salt = bcrypt.genSaltSync(10);
//        return bcrypt.hashSync(plaintTextPassword, salt);
//    }
//};

export const User = mongoose.model('user', userSchema);
