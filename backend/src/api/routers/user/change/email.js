import {checkForUndefined, errorFields, Mailer, valid} from "../models";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

const successFalse = (res, msg) => res.status(200).json({
    "success": false,
    "message": msg
});

const mail = new Mailer();

export const email = model => (req, res, next) => {
    const {email, password} = req.body;

    let error = errorFields('Missing', checkForUndefined({email, password}));
    if (error !== '') {
        throw new Error(error);
    }
    if (valid.email(email) === false) {
        return successFalse(res, 'Invalid email');
    }
    model.findOne({$or: [{'email': req.body.email}, {'pendingEmail': req.body.email}]})
        .then((user) => {
            if (user !== null) {
                return successFalse(res, 'Email exist');
            }
            if (req.user.password === null) {
                return successFalse(res, 'Need to add password');
            }
            if (req.user.email === null) {
                throw new Error("Can't change email");
            }
            if (bcrypt.compareSync(password, req.user.password) === false) {
                return successFalse(res, 'Invalid password');
            }
            const config = req.app.get('config');
            const crypt  = new Cryptr(config.secrets.crypt);

            req.user.activationToken = crypt.encrypt(email);
            req.user.pendingEmail    = email;
            req.user.save()
                .then(user => mail.sendActivation(email, user, config)
                    .then(() => res.status(201).json({
                        "success": true,
                        "message": "Activation was sent to your new email"
                    }))
                    .catch(error => next(error)))
                .catch(error => next(error));
        })
        .catch(error => next(error));
};
