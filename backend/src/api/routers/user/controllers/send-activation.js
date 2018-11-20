import {Mailer} from "../models";
import Cryptr from 'cryptr'

const mail = new Mailer();

export const sendActivation = model => (req, res, next) => {
    if (req.body.email === undefined) {
        throw new Error("Require 'email' field");
    }
    model.findOne({email: req.body.email})
        .then(user => {
            if (user === null || user.activated) {
                res.status(200).json({
                    "success": false,
                    "message": user ? "User activated" :
                        "User with this email doesn't exist"
                });
            } else {
                const config = req.app.get('config');
                const crypt  = new Cryptr(config.secrets.crypt);
                user.activationToken = crypt.encrypt(req.body.email);
                user.save()
                    .then(user => mail.sendActivation(user, config)
                        .then(() => res.status(201).json({
                            "success": true,
                            "message": "Activation was sent to your email"
                        }))
                        .catch(error => next(error)))
                    .catch(error => next(error));
            }
        })
        .catch(error => next(error));
};
