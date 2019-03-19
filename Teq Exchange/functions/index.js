// const stripe = require('stripe')(functions.config().keys.webhooks);
// const endpointSecret = functions.config().keys.signing;
const stripe = require("stripe")("sk_live_pbU4JWsYFK0GW1VFcRzjSMOi")
// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const nodemailer = require('nodemailer');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
// const cors = require('cors')({ origin: true });
const cors = require('cors')({ origin: true });
const app = express();

// const stripe = require('stripe')(functions.config().stripe.token);
exports.stripePayment = functions.https.onRequest(function (req, res) {
    cors(req, res, () => {

        function send(res, code, body) {
            console.log(body, 'body*****')
            res.send({
                statusCode: code,
                headers: {
                    'Access-Control-Allow-Origin': 'https://vendor-web-ffe78.firebaseapp.com/',

                },
                body: JSON.stringify(body),
            });
        }

        function charge(req, res) {
            const body = JSON.parse(req.body);
            const token = body.token.id;
            const amount = body.amount;
            const currency = body.currency;
            stripe.charges.create({
                amount,
                currency,
                description: 'Firebase Example',
                source: token,
            }).then(charge => {
                send(res, 200, {
                    message: 'Success',
                    charge,
                });
            }).catch(err => {
                console.log(err);
                send(res, 500, {
                    error: err.message,
                });
            });
        }
        try {
            charge(req, res);
        } catch (e) {
            console.log(e);
            send(res, 500, {
                error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
            });
        }

    })
})


exports.sendEmail = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        var transporter = nodemailer.createTransport({
            host: 'smtp@gmail.com',
            service: 'Gmail',
            auth: {
                user: 'williamomgvendor@gmail.com',
                pass: 'Abcd@123456'
            }
        });

        // var message = 'Hello, Welcome to App for Services.'

        // console.log('request', request)

        const mail = JSON.parse(request.body);
        console.info(mail, 'mail')
        var mailOptions = {
            from: 'williamomgvendor@gmail.com',
            to: mail.recepientEmail,
            subject: mail.subject,
            text: mail.message
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('error', error.message);

                response.json({ notSent: error });
            } else {
                console.log('Message sent: ' + info.response);
                response.json({ sent: info.response });
            };

        })
    })

});


// function charge(req, res) {
//     const body = JSON.parse(req.body);
//     console.log(req.body, '===', body);
//     const token = body.token.id;
//     const amount = body.amount;
//     const currency = body.currency;

//     // Charge card
//     stripe.charges.create({
//         amount,
//         currency,
//         description: 'Firebase Example',
//         source: token,
//     }).then(charge => {
//         send(res, 200, {
//             message: 'Success',
//             charge,
//         });
//     }).catch(err => {
//         console.log(err);
//         send(res, 500, {
//             error: err.message,
//         });
//     });
// }

// function send(res, code, body) {
//     console.log(body, 'body*****')
//     res.send({
//         statusCode: code,
//         headers: {
//             'Access-Control-Allow-Origin': 'https://vendor-web-ffe78.firebaseapp.com/',

//         },
//         body: JSON.stringify(body),
//     });
// }

// app.use(cors);
// app.post('/', (req, res) => {
//     console.info(JSON.parse(req.body), '===');
//     try {
//         charge(req, res);
//     } catch (e) {
//         console.log(e);
//         send(res, 500, {
//             error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
//         });
//     }

//     // Catch any unexpected errors to prevent crashing

// });

// exports.stripePayment = functions.https.onRequest(app);




// const nodemailer = require('nodemailer');

// exports.sendEmail = functions.https.onRequest((request, response) => {
//     console.log(request.body, '************');

//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'williamomgvendor@gmail.com',
//             pass: 'Abcd@123456'
//         }
//     });

//     // var message = 'Hello, Welcome to App for Services.'

//     // console.log('request', request)

//     const mail = JSON.parse(request.body);

//     var mailOptions = {
//         from: 'williamomgvendor@gmail.com',
//         to: mail.recepientEmail,
//         subject: mail.subject,
//         text: mail.message
//     }

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('error', error.message);

//             response.json({ notSent: error });
//         } else {
//             console.log('Message sent: ' + info.response);
//             response.json({ sent: info.response });
//         };

//     })

//     // response.send("Hello from Firebase!");

// });
