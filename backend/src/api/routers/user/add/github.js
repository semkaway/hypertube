import axios from "axios";

const successFalse = (res, msg) => res.status(200).json({
    "success": false,
    "message": msg
});

export const github = model => (req, res, next) => {
    if (req.body.code === undefined) {
        throw new Error("Require 'code' field");
    }

    axios.post('https://github.com/login/oauth/access_token', {
        'client_id': '1dfde4107005f390f4ff',
        'client_secret': '7f29e9bb1d5a93905d1965ffcf4cfb19812c5b1f',
        'code': req.body.code
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
                        if (user !== null) {
                            return successFalse(res, 'User exist');
                        }
                        if (req.user.image === null) {
                            req.user.image = response.data.avatar_url;
                        }
                        req.user.githubId = response.data.id;
                        req.user.save()
                            .then(() => res.status(201).json({"success": true}))
                            .catch(error => next(error));
                    })
                    .catch(error => next(error)))
                .catch(error => next(error))
        })
        .catch(error => next(error));
};
