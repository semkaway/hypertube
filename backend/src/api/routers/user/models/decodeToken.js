import jwt from 'jsonwebtoken'

export const decodeToken = (req, res, next) => {
    const config = req.app.get('config');
    if (req.body.token === undefined) {
        throw new Error("Require 'token' field");
    }
    jwt.verify(req.body.token, config.secrets.jwt, (error, decoded) => {
        if (error) {
            if (error.message === 'invalid token') {
                res.status(200).json({"success": false, "message": 'Invalid token'});
            } else {
                next(error);
            }
        } else {
            req.id = decoded.id;
            next();
        }
    });
};
