'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
// PROD
// const serviceAccount = require('../siph-recruit-firebase-adminsdk-ohc7r-3ac41b5bb2.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://siph-recruit.firebaseio.com'
// });
// UAT
// const serviceAccount = require('../siph-recruit-uat-firebase-adminsdk-9gnfq-c8fe70fe21.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://siph-recruit-uat.firebaseio.com'
// });
// SIT
const serviceAccount = require('../test-man-app-firebase-adminsdk-yy6pr-8880a407df.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://test-man-app.firebaseio.com'
});
const m_functions = require('./m_functions');
exports.functions = m_functions.handler;
const m_add_admin = require('./m_add_admin');
exports.addAdmin = m_add_admin.handler;
const m_send_mail_create = require('./m_send_mail_create');
exports.sendCreatePasswordEmail = m_send_mail_create.handler;
const m_jobs_spy = require('./m_jobs_spy');
exports.jobsSpy = m_jobs_spy.handler;
const m_i_score = require('./m_i_score');
exports.iScore = m_i_score.handler;
//# sourceMappingURL=index.js.map