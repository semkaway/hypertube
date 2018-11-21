import {Mailer, valid} from "../models";
import Cryptr from "cryptr";

const mail = new Mailer();

export const email = model => (req, res, next) => {
    if (req.body.email === undefined) {
        throw new Error("Require 'email' field");
    }
    if (valid.email(req.body.email) === false) {
        return res.status(200).json({"success": false, "message": 'Invalid email'});
    }
    model.findOne({
        $or: [
            {'email': req.body.email},
            {'pendingEmail': req.body.email}
        ]
    })
        .then((user) => {
            if (user !== null) {
                return res.status(200).json({"success": false, "message": 'Email exist'});
            }
            model.findById(req.id)
                .then(user => {
                    if (user === null) {
                        return res.status(200).json({"success": false, "message": 'Invalid token'});
                    }
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
                })
                .catch(error => next(error));
        })
        .catch(error => next(error));
};
