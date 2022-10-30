const axios = require('axios');

const signingSecret = process.env.SLACK_SIGNING_SECRET;
const token = process.env.SLACK_BOT_TOKEN;
let count1 = 0;
let count2 = 0;
exports.handler = (event, context, callback) => {
    count2++;
    const body = JSON.parse(event.body);
        switch (body.type) {
            case "url_verification": callback(null, body.challenge); break;
            case "event_callback": processRequest(body, callback); break;
            default: callback(null);
        }
};

const processRequest = (body, callback) => {
    switch (body.event.type) {
        case "message": processMessages(body, callback); break;
        case "app_mention": processAppMention(body, callback); break;
        default: callback(null);
    }
};

const processMessages = (body, callback) => {
    console.debug("message:", body.event.text);
    callback(null);
};

const processAppMention = (body, callback) => {
    const item = body.event.text.split(":").pop().trim();
    const message = {
        channel: body.event.channel,
        text: `Item: \`${item}\` is Count1: ${count1++} and Count2: ${count2}!`
    };
    axios({
        method: 'post',
        url: 'https://slack.com/api/chat.postMessage',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}` },
        data: message
    })
        .then((response) => {
            callback(null);
        })
        .catch((error) => {
            callback("failed to process app_mention");
        });
};