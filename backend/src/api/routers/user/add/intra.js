import axios from "axios";

const successFalse = (res, msg) => res.status(200).json({
    "success": false,
    "message": msg
});

export const intra = model => (req, res, next) => {
    if (req.body.code === undefined) {
        throw new Error("Require 'code' field");
    }

    axios.post('https://api.intra.42.fr/oauth/token', {
        'grant_type': 'authorization_code',
        'client_id': '5b2ec6bcbe8d7d9fa32d6129854aa36ea010afa550ec096b3733bc8cf388d0a7',
        'client_secret': 'b4a92aa14e861ade4033ecb3e15f674fc2a38f925f969a267ee0f99603129f4f',
        'code': req.body.code,
        'redirect_uri': 'http://localhost:8084/intra',
    })
        .then(response => axios.get('https://api.intra.42.fr/v2/me', {
            headers: {'Authorization': `Bearer ${response.data.access_token}`}
        })
            .then(response => model.findOne({'intraId': response.data.id})
                .then(user => {
                    if (user !== null) {
                        return successFalse(res, 'User exist');
                    }
                    if (req.user.image === null) {
                        req.user.image = response.data.image_url;
                    }
                    req.user.intraId = response.data.id;
                    req.user.save()
                        .then(() => res.status(201).json({"success": true}))
                        .catch(next);
                })
                .catch(next))
            .catch(next))
        .catch(next);
};
