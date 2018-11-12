import randomToken from 'random-token'
import bcrypt from 'bcrypt'
import {Mailer} from '../models'

const mail = new Mailer();

const saveUser = (model, body, res, next) => {
    body.activationToken = randomToken(16);

    body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));

    model.create(body)
        .then(user =>
            mail.sendActivation(user)
                .then(() =>
                    res.status(201).json({
                        "success": true,
                        "message": "Activation was sent to your email"
                    }))
                .catch(error => next(error)))
        .catch(error => next(error));
};

export const createUser = model => (req, res, next) => {
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
