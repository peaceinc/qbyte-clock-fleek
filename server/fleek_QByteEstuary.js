// const urllib = require("urllib");
const fetch = require("node-fetch");
// import fetch from "node-fetch";
// import urllib from "urllib";
// import fetch from "node-fetch";

let apiUrl =
  "https://api.estuary.tech/collections/content/bfffcaab-d302-4bab-b0ed-552e450a2dc9";

let options = {
  method: "GET",
  contentType: "json",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer EST99cd9b05-5075-47b4-9897-f702f2e2ba2dARY",
    // 'Content-Length': data.length
  },
};
async function getJson(url, options) {
  let response = await fetch(url, options);
  let res = await response.json();
  return res;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function wordGenerator(sepfile) {
  let words = [];
  for (let a in sepfile) {
    if (sepfile[a].includes("QBYTE")) {
      xandy = sepfile[a].split(",");
      newWord = xandy[xandy.length - 1].slice(8);

      words.push(newWord);
    }
  }
  return words;
}
async function main() {
  //OPTION 1
  getJson(apiUrl, options)
    .then((data) => {
      //   console.log(`0 Main data: ${Object.keys(data[0])}`);
      let latest_cid = data[data.length - 1]["cid"];
      let dataUrl = `https://${latest_cid}.ipfs.dweb.link`;
      var httpclient = require("urllib").create();
      return httpclient.request(dataUrl);
    })
    .then((response) => {
      let page_html = response.data.toString();
      let sepfile = page_html.split("\n");
      //   console.log(`sepfile ${sepfile}`);
      return wordGenerator(sepfile);
    })
    .then((wordsArr) => {
      setTimeout(() => {}, 1000);
      for (var a = 0; a < wordsArr.length; a++) {
        console.log(wordsArr[a]);
        sleep(1000);
      }
      console.log("DONE!");
      return main();
    });
}

main();
