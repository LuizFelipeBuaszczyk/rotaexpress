const { google } = require('googleapis');

async function getNewToken (REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI) {

    const oAuth2 = new google.auth.OAuth2 (
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oAuth2.setCredentials({
        refresh_token: REFRESH_TOKEN,
    });

    console.log(oAuth2);
    try {
        const { credentials } = await oAuth2.refreshAccessToken();
        console.log(credentials);

        if (credentials){
            const newAcessToken = credentials.access_token;
        
            return newAcessToken;
        }
    } catch (error) {
        throw error;    
    }
} 

module.exports = { getNewToken }