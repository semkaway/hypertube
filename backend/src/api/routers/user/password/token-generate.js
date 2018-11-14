import {Mailer} from "../models";
import randomToken from 'random-token'

const mail = new Mailer();

export const tokenGenerate = model => (req, res, next) => {
    if (req.body.email === undefined) {
        throw new Error("Require 'email' field");
    }
    model.findOne({email: req.body.email})
        .then(found => {
            if (found === null) {
                res.status(200).json({
                    "success": false,
                    "message": "User with this email doesn't exist"
                });
            } else {
                found.resetPasswordToken = randomToken(16);
                found.save()
                    .then(user =>
                        mail.sendResetPasswordLink(user)
                            .then(() => res.status(201).json({
                                "success": true,
                                "message": "To reset password check your mail"
                            }))
                            .catch(error => next(error)))
                    .catch(error => next(error))
            }
        })
        .catch(error => next(error));
};
