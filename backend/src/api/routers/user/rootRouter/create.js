import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'
import {Mailer} from '../models'

const mail = new Mailer();

const saveUser = (model, req, res, next) => {
    const config = req.app.get('config');
    const crypt  = new Cryptr(config.secrets.crypt);
    req.body.activationToken = crypt.encrypt(req.body.email);
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    model.create(req.body)
        .then(user =>
            mail.sendActivation(user.email, user, config)
                .then(() =>
                    res.status(201).json({
                        "success": true,
                        "message": "Activation was sent to your email"
                    }))
                .catch(next))
        .catch(next);
};

export const createUser = model => (req, res, next) => {
    model.findOne({
        $or: [
            {'email': req.body.email},
            {'pendingEmail': req.body.email}
        ]
    })
        .then(user => {
            if (user === null) {
                return saveUser(model, req, res, next)
            }
            res.status(200).json({
                "success": false,
                "message": "User with this email already exist"
            });
        })
        .catch(next);
};
