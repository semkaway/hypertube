import jwt from 'jsonwebtoken'

export const decodeToken = (req, res, next) => {
    const config = req.app.get('config');
    if (req.body.token === undefined && req.params.token === undefined) {
        throw new Error("Require 'token'");
    }
    const token = req.params.token !== undefined ? req.params.token : req.body.token;
    jwt.verify(token, config.secrets.jwt, (error, decoded) => {
        if (error) {
            if (error.message === 'invalid token') {
                return res.status(200).json({"success": false, "message": 'Invalid token'});
            }
            return next(error);
        }
        req.id = decoded.id;
        next();
    });
};
