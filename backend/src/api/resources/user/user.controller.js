import {User} from './user.model'
import randomToken from 'random-token'
import bcrypt from 'bcrypt'
import {Mail} from './Mail'

const mail = new Mail();

const saveUser = (model, body, res, next) => {
    body.activationToken = randomToken(16);

    body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));

    model.create(body)
        .then(() =>
            mail.sendActivation(body)
                .then(() =>
                    res.status(201).json({
                        "success": true,
                        "message": "Activation was sent to your email"
                    }))
                .catch(error => next(error)))
        .catch(error => next(error));
};

const createUser = model => (req, res, next) => {

    model.where({email: req.body.email}).findOne()
        .then(found => {
            if (found === null) {
                saveUser(model, req.body, res, next)
            } else {
                res.status(200).json({
                    "success": false,
                    "message": "User with this email already exist"
                });
            }
        })
        .catch(error => next(error));
};

const emailExist = model => (req, res, next) => {
    if (req.body.email === undefined) {
        throw new Error("Require 'email' field");
    }
    model.where({email: mail}).findOne()
        .then(found => res.status(200).json({"exist": found !== null}))
        .catch(error => next(error));
};

const controllers = {
    createUser: createUser(User),
    emailExist: emailExist(User)
};

export default controllers
