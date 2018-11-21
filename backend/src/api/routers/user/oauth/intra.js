import axios from 'axios'
import jwt from "jsonwebtoken";
import {checkForUndefined, errorFields, valid} from "../models";

const generateToken = (res, secret, user) => res.status(200).json({
    "success": true,
    "token": jwt.sign({id: user._id}, secret),
    "locale": user.locale
});

export const intra = model => (req, res, next) => {
    let {code, locale} = req.body;

    let error = errorFields('Missing', checkForUndefined({code, locale}));
    if (error !== '') {
        throw new Error(error);
    }

    if (valid.locale(locale) === false) {
        locale = 'en';
    }

    axios.post('https://api.intra.42.fr/oauth/token', {
        'grant_type': 'authorization_code',
        'client_id': '5b2ec6bcbe8d7d9fa32d6129854aa36ea010afa550ec096b3733bc8cf388d0a7',
        'client_secret': 'b4a92aa14e861ade4033ecb3e15f674fc2a38f925f969a267ee0f99603129f4f',
        'code': code,
        'redirect_uri': 'http://localhost:8084/intra',
    })
        .then(response => axios.get('https://api.intra.42.fr/v2/me', {
            headers: {'Authorization': `Bearer ${response.data.access_token}`}
        })
            .then(response => model.findOne({'intraId': response.data.id})
                .then(user => {
                    let secret = req.app.get('config').secrets.jwt;
                    if (user !== null) {
                        return generateToken(res, secret, user);
                    }
                    model.create({
                        'activated': true,
                        'intraId': response.data.id,
                        'first': response.data.first_name,
                        'last': response.data.last_name,
                        'locale': locale,
                        'image': response.data.image_url,
                    })
                        .then(user => generateToken(res, secret, user))
                        .catch(error => next(error))
                })
                .catch(error => next(error)))
            .catch(error => next(error)))
        .catch(error => next(error));
};
