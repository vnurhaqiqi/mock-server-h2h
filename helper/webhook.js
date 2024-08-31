const axios = require('axios');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendWebhook(url, params) {
    try {
        await delay(2000);

        const response = await axios.get(url, { params: params });
        console.log("Success send webhook", response.data);
    } catch (error) {
        console.error("Error send webhok:", error);
    }
}

module.exports = sendWebhook; 