require('dotenv').config();
const EBAY_CLIENT_ID = process.env.EBAY_CLIENT_ID;
const EBAY_CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET;

async function getEbayToken() {
    const credentials = Buffer.from(`${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`).toString('base64');
    const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`
        },
        body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope'
    });
    const data = await response.json();
    return data.access_token;
}

async function test() {
    const token = await getEbayToken();
    const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=laptop&limit=2`;
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    console.log(JSON.stringify(data.itemSummaries[0], null, 2));
}

test().catch(console.error);
