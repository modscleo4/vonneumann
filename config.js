const {requireOrNull} = require('./lib/utils');
const config = requireOrNull('./config.json');

module.exports = {
    prefix: config.prefix || process.env.PREFIX,
    token: config.token || process.env.TOKEN,
    webhook_id: config.webhook_id || process.env.WEBHOOK_ID,
    webhook_token: config.webhook_token || process.env.WEBHOOK_TOKEN,
};
