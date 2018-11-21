import axios from 'axios'
import jwt from "jsonwebtoken";
import {checkForUndefined, errorFields, valid} from "../models";


const generateToken = (res, secret, user) => res.status(200).json({
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

    if (valid.locale(locale) === false) {
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
            }
            axios.get('https://api.github.com/user', {
                headers: {'Authorization': `token ${response.data.access_token}`}
            })
                .then(response => model.findOne({'githubId': response.data.id})
                    .then(user => {
                        let secret = req.app.get('config').secrets.jwt;
                        if (user !== null) {
                            return generateToken(res, secret, user);
                        }
                        model.create({
                            'githubId': response.data.id,
                            'activated': true,
                            'first': response.data.name ?
                                response.data.name : response.data.login,
                            'locale': locale,
                            'image': response.data.avatar_url,
                        })
                            .then(user => generateToken(res, secret, user))
                            .catch(error => next(error));
                    }).catch(error => next(error)))
                .catch(error => next(error))
        }).catch(error => next(error));
};
