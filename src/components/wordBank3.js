const subprocess = require("subprocess");
const urllib = require("urllib");
const request = require("request");
const axios = require("axios");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function wordGenerator(sepfile) {
  let words = [];
  for (let a in sepfile) {
    if (sepfile[a].includes("QBYTE")) {
      let xandy = sepfile[a].split(",");
      var newWord = xandy[xandy.length - 1].slice(8);
      words.push(newWord);
      console.log(newWord);
    }
  }
  return words;
}

const NewIPFS = function () {
  const url =
    "https://api.estuary.tech/collections/content/bfffcaab-d302-4bab-b0ed-552e450a2dc9";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer EST99cd9b05-5075-47b4-9897-f702f2e2ba2dARY",
      // 'Content-Length': data.length
    },
  };

  axios
    .get(url, options)
    .then((res) => {
      var latest_cid = res.data[res.data.length - 1]["cid"];
      let dataUrl = `https://${latest_cid}.ipfs.dweb.link`;
      var httpclient = require("urllib").create();
      return httpclient.request(dataUrl);
      // return request.get({ uri: dataUrl });
    })
    .then((response) => {
      console.log("res.data", response.data);
      let page_html = response.data.toString();
      let sepfile = page_html.split("\n");
      return wordGenerator(sepfile);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
};

const wordBankArr = NewIPFS();

module.exports = wordBankArr;
