import axios from 'axios'
import jwt from "jsonwebtoken";
import {checkForUndefined, errorFields, valid} from "../models";


const returnToken = (res, secret, user) => res.status(200).json({
    "success": true,
    "token": jwt.sign({id: user._id}, secret),
    "locale": user.locale
});

export const github = model => (req, res, next) => {
    let {code, locale} = req.body;

    let error = errorFields('Missing', checkForUndefined({code, locale}));
    if (error !== '') {
        throw new Error(error);
    }

    if (valid['locale'](locale) === false) {
        locale = 'en';
    }

    axios.post('https://github.com/login/oauth/access_token', {
        'client_id': '1dfde4107005f390f4ff',
        'client_secret': '7f29e9bb1d5a93905d1965ffcf4cfb19812c5b1f',
        'code': code
    }, {'headers': {'Accept': 'application/json'}})
        .then(response => {
            if (response.data.error) {
                throw new Error(response.data.error_description);
            } else {
                axios.get('https://api.github.com/user', {
                    headers: {'Authorization': `token ${response.data.access_token}`}
                })
                    .then(response => {
                        let email = response.data.email ?
                            response.data.email :
                            response.data.login + response.data.id;
                        model.findOne({'email': email})
                            .then(user => {
                                let secret = req.app.get('config').secrets.jwt;
                                if (user === null) {
                                    model.create({
                                        'activation': true,
                                        'email': email,
                                        'password': null,
                                        'first': response.data.login,
                                        'last': 'Github',
                                        'oauth': 'github',
                                        'locale': locale,
                                        'image': response.data.avatar_url,
                                    })
                                        .then(user => returnToken(res, secret, user))
                                        .catch(error => next(error))
                                } else {
                                    returnToken(res, secret, user);
                                }
                            }).catch(error => next(error))
                    }).catch(error => next(error))
            }
        }).catch(error => next(error));
};
