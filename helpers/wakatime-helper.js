const axios = require('axios');

const wakatimeClient = axios.create({ baseURL: 'https://wakatime.com/api/v1' });

module.exports = wakatimeClient;
