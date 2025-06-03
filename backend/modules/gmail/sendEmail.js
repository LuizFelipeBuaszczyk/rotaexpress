const { google } = require('googleapis');
const MailComposer = require('mailcomposer').MailComposer;

async function sendEmail(token, origin, destination, subject, body) {
    try {

        const auth = new google.auth.OAuth2({
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET
        });
        auth.setCredentials({access_token: token});

        const gmail = google.gmail({ version: 'v1', auth });

        const mailOptions = {
            from: origin,
            to: destination,
            subject: subject,
            html: body
        };

        const mail = new MailComposer(mailOptions);

        // Criando mensagem no formato MIME
        const codedMessage = await new Promise((resolve, reject) => {
        mail.compile().build((err, message) => {
            if (err) {
                throw err;
            }

            // Codificar a mensagem em Base64 URL-safe
            const encoded = Buffer.from(message).toString('base64')
                .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            
            resolve(encoded); 
        });
    });

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