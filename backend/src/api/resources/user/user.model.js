import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const string = {type: String, required: true};
const stringNullable = {type: String, default: null};

const userSchema = new mongoose.Schema({
    email: {...string, unique: true},
    password: string,
    first: string,
    last: string,
    activation: {
        type: Boolean,
        default: false
    },
    activationToken: stringNullable,
    resetPasswordToken: stringNullable
}, {timestamps: true});

userSchema.methods = {
    authenticate(plaintTextPassword) {
        return bcrypt.compareSync(plaintTextPassword, this.password);
    },
    hashPassword(plaintTextPassword) {
        if (!plaintTextPassword) {
            throw new Error('Could not save user');
        }

        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plaintTextPassword, salt);
    }
};

export const User = mongoose.model('user', userSchema);
