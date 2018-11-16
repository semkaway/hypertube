import mongoose from 'mongoose'

const stringRequired = {type: String, required: true};
const stringNull     = {type: String, default: null};
const False          = {type: Boolean, default: false};

const userSchema = new mongoose.Schema({
    email: {...stringRequired, unique: true},
    password: stringNull,
    first: stringRequired,
    last: stringRequired,
    locale: String,
    oauth: stringNull,
    activation: False,
    activationToken: stringNull,
    resetPasswordToken: stringNull,
    image: stringNull,
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
