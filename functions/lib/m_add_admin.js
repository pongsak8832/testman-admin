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
function grantModeratorRole(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield admin.auth().getUserByEmail(email);
        if (user.customClaims && user.customClaims.moderator === true) {
            return;
        }
        return admin.auth().setCustomUserClaims(user.uid, {
            moderator: true,
            manager: true,
            teacher: true
        });
    });
}
//# sourceMappingURL=m_add_admin.js.map