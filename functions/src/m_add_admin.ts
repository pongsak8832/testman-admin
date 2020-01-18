import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

exports.handler = functions.https.onCall((data, context) => {
  if (context.auth.token.country !== undefined) {
    return {
      country: context.auth.token.country
    };
  }

  const email = data.email;
  return grantModeratorRole(email).then(() => {
    return {
      result: `Request fulfilled! ${email} is now a moderator.`
    };
  });

});

async function grantModeratorRole(email: string): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).moderator === true) {
    return;
  }
  return admin.auth().setCustomUserClaims(user.uid, {
    moderator: true,
    manager: true,
    teacher: true
  });
}
