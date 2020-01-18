"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors')({ origin: true });
const app = express();
app.use(cors);
app.post('/createUserByEmail', (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield admin.auth().createUser({
        email: req.body.email,
    }).then(function (userRecord) {
        return __awaiter(this, void 0, void 0, function* () {
            yield admin.auth().setCustomUserClaims(userRecord.uid, { admin: true }).then(() => {
                return res.status(200).json(userRecord);
            }).catch(function (errorSetCusstom) {
                return res.status(400).json(errorSetCusstom);
            });
        });
    }).catch(function (error) {
        return res.sendStatus(400).json(error);
    });
}));
app.post('/createUserAdmin', (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield admin.auth().createUser({
        email: req.body.email,
        displayName: req.body.displayName,
    }).then((userRes) => __awaiter(this, void 0, void 0, function* () {
        yield admin.auth().setCustomUserClaims(userRes.uid, {
            role: req.body.role,
        }).then(() => {
            return res.status(200).json(userRes);
        }).catch((setCustomUserClaimsError) => {
            return res.status(400).json({
                error: setCustomUserClaimsError.toString()
            });
        });
    })).catch((createUserError) => {
        return res.status(400).json({
            error: createUserError.toString()
        });
    });
}));
app.post('/sendCreatePasswordEmail', (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield admin.auth().generatePasswordResetLink(req.body.email).then(function (response) {
        return res.status(200).json(response);
    }).catch(function (error) {
        return res.sendStatus(400).json(error);
    });
}));
// Expose Express API as a single Cloud Function:
exports.handler = functions.https.onRequest(app);
//# sourceMappingURL=m_functions.js.map