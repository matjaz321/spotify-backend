const express = require('express');
const router = express.Router();

import axios from 'axios';
import qs from 'qs';
import config from '../../config';
import firebase from '../api/firebase';

router.get('/authenticate', (req, res, next) => {
    if (req.query.code) {
        const encodedAuth = Buffer
        .from(`${config.spotify.clientId}:${config.spotify.clientSecret}`)
        .toString('base64');
        axios({
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${encodedAuth}`
            },
            data: qs.stringify({
                grant_type: "authorization_code",
                code: req.query.code,
                redirect_uri: config.spotify.redirectUri
            }),
            url: `${config.spotify.baseUrl}/api/token`
        }).then(res => {
            firebase.saveAuthData(res.data);
        });
    }
    res.end()
});

router.get('/login', (req, res, next) => {
    var scopes = 'user-read-private user-read-email';
    res.redirect(301, config.spotify.baseUrl + '/authorize' +
        '?response_type=code' +
        '&client_id=' + config.spotify.clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + config.spotify.redirectUri
    );
});

router.get('/user-data/{user}', async(req, res, next) =>{
    return await axios({
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(res => res);
});

module.exports = router;
