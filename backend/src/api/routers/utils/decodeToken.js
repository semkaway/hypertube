import jwt from 'jsonwebtoken'

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
        req.id = decoded.id;
        next();
    });
};
