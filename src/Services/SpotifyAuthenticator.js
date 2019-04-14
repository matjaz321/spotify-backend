import config from '../../config';
import spotifyApi from '../api/spotify';

const authenticate = () => {
    try {
        spotifyApi.get('', {
            params: {
                'response_type': 'code',
                'client_id': config.spotify.client_id,
                'redirect_uri': ''
            },
        });
    }
    catch(e) {
        throw new Error(e.message);
    }
};

module.export = {
    authenticate,
};