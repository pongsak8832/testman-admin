// import * as functions from 'firebase-functions';
// import * as ActiveDirectory from 'activedirectory';
//
// exports.handler = functions.https.onRequest(async (req, res) => {
//   // const response = await searchData(req.query.search);
//   return res.json('');
// });
//
// async function connectAD() {
//
//   let config = {
//     url: 'ldap://35.209.65.96',
//     username: 'chaiwutmaneechot@35.209.65.96',
//     password: 'bhC}IY%Etu4}{E<'
//   };
//
//   let ad = new ActiveDirectory(config);
//   let username = 'adsetup_sa@35.209.65.96';
//   let password = 'i.AKtSGvgZ9GyE';
//
//   ad.authenticate(username, password, function (err, auth) {
//     if (err) {
//       console.log('ERROR: ' + JSON.stringify(err));
//       return;
//     }
//
//     if (auth) {
//       console.log('Authenticated!');
//     } else {
//       console.log('Authentication failed!');
//     }
//   });
// }
//
// connectAD();
//# sourceMappingURL=m_ad.js.map