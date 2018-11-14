import {Mailer} from "../models";
import randomToken from 'random-token'

const mail = new Mailer();

export const resendActivation = model => (req, res, next) => {
    if (req.body.email === undefined) {
        throw new Error("Require 'email' field");
    }
    model.findOne({email: req.body.email})
        .then(user => {
            if (user === null || user.activation) {
                res.status(200).json({
                    "success": false,
                    "message": user ? "User activated" :
                        "User with this email doesn't exist"
                });
            } else {
                user.activationToken = randomToken(16);
                mail.sendActivation(user)
                    .then(() => user.save()
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
