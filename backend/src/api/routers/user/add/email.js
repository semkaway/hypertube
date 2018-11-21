import {Mailer, valid} from "../models";
import Cryptr from "cryptr";

const successFalse = (res, msg) => res.status(200).json({
    "success": false,
    "message": msg
});

const mail = new Mailer();

export const email = model => (req, res, next) => {
    if (req.body.email === undefined) {
        throw new Error("Require 'email' field");
    }
    if (valid.email(req.body.email) === false) {
        return successFalse(res, 'Invalid email');
    }
    model.findById(req.id)
        .then(user => {
            if (user === null) {
                return successFalse(res, 'Invalid token');
            }
            if (user.email !== null || user.pendingEmail !== null) {
                throw new Error("Can't add email");
            }
            const config = req.app.get('config');
            const crypt  = new Cryptr(config.secrets.crypt);
            user.pendingEmail = req.body.email;
            user.activationToken = crypt.encrypt(req.body.email);
            user.save()
                .then(user => mail.sendActivation(user.pendingEmail, user, config)
                    .then(() => res.status(201).json({
                        "success": true,
                        "message": "Activation was sent to your email"
                    }))
                    .catch(error => next(error)))
                .catch(error => next(error));
        })
        .catch(error => next(error));
};
