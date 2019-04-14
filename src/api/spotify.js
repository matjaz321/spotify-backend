const config = require('../../config');
const axios = require('axios');

export default axios.create({
    baseUrl: config.baseUrl,
});