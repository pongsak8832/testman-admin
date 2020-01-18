import * as functions from 'firebase-functions';
import * as request from 'request-promise';
import * as h2p from 'html2plaintext';

exports.handler = functions.https.onRequest(async (req, res) => {
  const response = await searchData(req.query.search);
  return res.set({'Access-Control-Allow-Origin': '*'}).sendStatus(200).json(response);
});

async function searchData(search) {

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
    } catch (e) {
      console.log('failed 1.');
    }

    const list = [];
    lists.forEach((s) => {
      // console.dir('lists data '+ h2p(s));

      let link = '';
      try {
        link = h2p(s).split('&sa=')[0];
      } catch (e) {
      }
      // console.dir('link : '+ link.trim());

      let title = '';
      try {
        title = h2p(s).split('">')[1].split('›')[0].split('http')[0].split('www.')[0];
      } catch (e) {
      }
      // console.dir('title : '+ title.trim());

      let description = '';
      try {
        description = h2p(s).split('›')[h2p(s).split('›').length - 1].split('>')[0];
      } catch (e) {
      }
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
}

// searchData('Chaiwutmaneechot');
