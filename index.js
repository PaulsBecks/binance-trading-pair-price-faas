var https = require('https');

const TRADING_PAIR = process.env.TRADING_PAIR || "BTCUSDT"

const options = {
    host: "api.binance.com",
    port: "443",
    path: '/api/v3/ticker/price?symbol=' + TRADING_PAIR,
    method: 'GET',
};

function doRequest(options) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(responseBody));
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.end();
    });
}

const main = async (req, res) => {
    const data = await doRequest(options)
    const text = (data.price + "").slice(0, 6)
    const symbol = []
    return res.json({ text, symbol })
}

main()

module.exports = main

