import Cryptr from "cryptr";

export const tokenCheck = model => (req, res, next) => {
    if (req.params.token.toString().length < 32) {
        res.status(200).json({"success": false, "message": 'Invalid token'});
    } else {
        const config = req.app.get('config');
        const crypt  = new Cryptr(config.secrets.crypt);
        const email  = crypt.decrypt(req.params.token);

        model.findOne({'email': email})
            .then(user => {
                if (user === null || user.resetPasswordToken !== req.params.token) {
                    res.status(200).json({"success": false, "message": 'Invalid token'});
                } else {
                    res.status(200).json({"success": true});
                }
            })
            .catch(error => next(error));
    }
};
