// import os
// import json
// import subprocess
// from urllib.request import urlopen as uReq
// import time
const subprocess = require("subprocess");
const urllib = require("urllib");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

var NewIPFS = function () {
  // subprocess.check_output() javascript equivalent
  var estuary_json = subprocess.spawn(
    'curl -X GET -H "Authorization: Bearer EST99cd9b05-5075-47b4-9897-f702f2e2ba2dARY" https://api.estuary.tech/collections/content/bfffcaab-d302-4bab-b0ed-552e450a2dc9',
    (shell = true)
  );

  // json.loads() javascript equivalent
  var estuary_arr = JSON.parse(estuary_json);
  var latest_cid = estuary_arr[-1]["cid"];
  var data = `https://${latest_cid}.ipfs.dweb.link`;

  var uClient = urllib.request(data);
  // urllib.request(data, function(err, data, res) {});
  var page_html = uClient.read().toSring();
  // FIXME .close() javascript equivalent
  uClient.close();

  var sepfile = page_html.split("\\n");

  let words = [];
  for (var a = 0; a < sepfile.length; a++) {
    if ("QBYTE" in sepfile[a]) {
      xandy = sepfile[a].split(",");
      words.append(xandy[-1].slice(8));
    }
  }
  return words;
};
while (true) {
  let new_words = NewIPFS();

  for (var a = 0; a < new_words.length; a++) {
    console.log(new_words[a]);
    sleep(1000);
  }
}
