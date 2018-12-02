import jwt from 'jsonwebtoken'
import {User} from "../user/models";

export const decodeToken = (req, res, next) => {
    const config = req.app.get('config');
    if (req.headers.authorization === undefined) {
        throw new Error("Require 'token'");
    }
    jwt.verify(req.headers.authorization, config.secrets.jwt, (error, decoded) => {
        if (error) {
            if (error.message === 'invalid token') {
                return res.status(200).json({"success": false, "message": 'Invalid token'});
            }
            return next(error);
        }
        User.findById(decoded.id)
            .then(user => {
                if (user === null || user.activated === false) {
                    return res.status(200).json({"success": false, "message": 'Invalid token'});
                }
                req.user = user;
                req.id = decoded.id;
                next();
            })
            .catch(error => next(error));
    });
};
