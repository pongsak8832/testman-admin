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
const functions = require("firebase-functions");
const request = require("request-promise");
const h2p = require("html2plaintext");
exports.handler = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const response = yield searchData(req.query.search);
    return res.set({ 'Access-Control-Allow-Origin': '*' }).sendStatus(200).json(response);
}));
function searchData(search) {
    return __awaiter(this, void 0, void 0, function* () {
        return request({
            method: 'GET',
            uri: 'https://www.google.com/search?q=' + encodeURI(search),
            resolveWithFullResponse: true,
            simple: true,
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            },
            keepAlive: true,
        }).then((response) => {
            console.log('response code ' + response.statusCode);
            let lists = [];
            try {
                lists = response.body.split('<a href="/url?q=');
                lists = lists.slice(1, lists.length - 1);
                // console.dir('lists '+ lists.length);
            }
            catch (e) {
                console.log('failed 1.');
            }
            const list = [];
            lists.forEach((s) => {
                // console.dir('lists data '+ h2p(s));
                let link = '';
                try {
                    link = h2p(s).split('&sa=')[0];
                }
                catch (e) { }
                // console.dir('link : '+ link.trim());
                let title = '';
                try {
                    title = h2p(s).split('">')[1].split('›')[0].split('http')[0].split('www.')[0];
                }
                catch (e) { }
                // console.dir('title : '+ title.trim());
                let description = '';
                try {
                    description = h2p(s).split('›')[h2p(s).split('›').length - 1].split('>')[0];
                }
                catch (e) { }
                // console.dir('description : '+ description.trim());
                // console.dir('description : '+ h2p(s));\
                list.push({
                    'title': title.trim(),
                    'description': description.trim(),
                    'link': link.trim(),
                });
            });
            return list;
            // console.dir(list);
            // console.dir('list  ' + list.length);
        }).catch((e) => {
            console.log('failed. ' + e);
            return [];
        });
    });
}
// searchData('Chaiwutmaneechot');
//# sourceMappingURL=m_i_score.js.map