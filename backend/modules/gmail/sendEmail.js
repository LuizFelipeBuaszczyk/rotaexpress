const { google } = require('googleapis');

async function sendEmail(token, origin, destination, subject, body) {
    try {

        const auth = new google.auth.OAuth2({
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET
        });
        auth.setCredentials({access_token: token});

        const gmail = google.gmail({ version: 'v1', auth });

        // Criando mensagem no formato MIME
        const message = `From: ${origin}\r\n` +
                        `To: ${destination}\r\n` +
                        `Subject: ${subject}\r\n\r\n` +
                        body;

        // Codificar a mensagem em Base64
        const codedMessage = Buffer.from(message).toString('base64')
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        
        
        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: codedMessage
            }
        });

        return {success: true};
        
    } catch (error){
        throw error;
    }
}

module.exports = { sendEmail }