import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as express from 'express';

const cors = require('cors')({origin: true});
const app = express();

app.use(cors);

app.post('/createUserByEmail', async (req, res) => {
  await admin.auth().createUser({
    email: req.body.email,
  }).then(async function (userRecord) {
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true }).then(() => {
      return res.status(200).json(userRecord);
    }).catch(function (errorSetCusstom) {
      return res.status(400).json(errorSetCusstom);
    });
  }).catch(function (error) {
    return res.sendStatus(400).json(error);
  });
});

app.post('/createUserAdmin', async (req, res) => {
  await admin.auth().createUser({
    email: req.body.email,
    displayName: req.body.displayName,
  }).then(async (userRes) => {
    await admin.auth().setCustomUserClaims(userRes.uid,
      {
        role: req.body.role,
      }
    ).then(() => {
      return res.status(200).json(userRes);
    }).catch((setCustomUserClaimsError) => {
      return res.status(400).json({
        error: setCustomUserClaimsError.toString()
      });
    });
  }).catch((createUserError) => {
    return res.status(400).json({
      error: createUserError.toString()
    });
  });
});

app.post('/sendCreatePasswordEmail', async (req, res) => {
  await admin.auth().generatePasswordResetLink(req.body.email).then(function (response) {
    return res.status(200).json(response);
  }).catch(function (error) {
    return res.sendStatus(400).json(error);
  });
});

// Expose Express API as a single Cloud Function:
exports.handler = functions.https.onRequest(app);
