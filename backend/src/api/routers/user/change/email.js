import {Mailer, valid} from "../models";
import Cryptr from "cryptr";

const mail = new Mailer();

export const email = model => (req, res, next) => {
    if (req.body.email === undefined) {
        throw new Error("Require 'email' field");
    }
    if (valid.email(req.body.email) === false) {
        res.status(200).json({"success": false, "message": 'Invalid email'});
    } else {
        model.findOne({
            $or: [
                {'email': req.body.email},
                {'pendingEmail': req.body.email}
            ]
        })
            .then((user) => {
                if (user !== null) {
                    res.status(200).json({"success": false, "message": 'Email exist'});
                } else {
                    model.findById(req.id)
                        .then(user => {
                            if (user === null) {
                                res.status(200).json({"success": false, "message": 'Invalid token'});
                            } else {
                                const config = req.app.get('config');
                                const crypt  = new Cryptr(config.secrets.crypt);

                                user.activationToken = crypt.encrypt(req.body.email);
                                user.pendingEmail    = req.body.email;
                                user.save()
                                    .then(user => mail.sendActivation(user.pendingEmail, user, config)
                                        .then(() => res.status(201).json({
                                            "success": true,
                                            "message": "Activation was sent to your new email"
                                        }))
                                        .catch(error => next(error)))
                                    .catch(error => next(error));
                            }
                        })
                        .catch(error => next(error));
                }
            })
            .catch(error => next(error));
    }
};
