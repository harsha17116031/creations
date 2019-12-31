/* eslint no-console: 0 */

'use strict';

const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
module.exports=function(){
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account');
            console.error(err);  
            return process.exit(1);
        }
    
        console.log('Credentials obtained, sending message...');
    
        // NB! Store the account object values somewhere if you want
        // to re-use the same account for future mail deliveries
    
        // Create a SMTP transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'dagmar.bruen@ethereal.email',
                pass: 'fFTBSKaEPPEVTfS2hN'
            }
        });
    
        // Message object
        let message = {
            // Comma separated list of recipients
            to: 'ghantaharsha.harshareddy@gmail.com',
    
            // Subject of the message
            subject: 'Nodemailer is unicode friendly ✔' + Date.now(),
    
            // plaintext body
            text: 'Hello to myself!',
    
            // HTML body
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
            </head>
            <body>
                <h1>Hello</h1>
                <h2>Hello</h2>
                <h6>hiii</h6>
                <a href="http://localhost:3000/">Click this to get to a link</a>
                <p><a href="http://www.girlncare.com">Click this for girlncare</a></p>
            </body>
            </html>`,
    
            // AMP4EMAIL
            amp: `<!doctype html>
            <html ⚡4email>
              <head>
                <meta charset="utf-8">
                <style amp4email-boilerplate>body{visibility:hidden}</style>
                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
              </head>
              <body>
                <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
                  <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
              </body>
            </html>`,
    
            // An array of attachments
            
        };
    
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return process.exit(1);
            }
    
            console.log('Message sent successfully!');
            console.log(nodemailer.getTestMessageUrl(info));
    
            // only needed when using pooled connections
            transporter.close();
        });
    });
};