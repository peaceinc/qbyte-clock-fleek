const subprocess = require("subprocess");
const urllib = require("urllib");
const request = require("request");
const axios = require("axios");
this.list = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function wordGenerator(sepfile) {
  let words = [];
  for (let a in sepfile) {
    if (sepfile[a].includes("QBYTE")) {
      let xandy = sepfile[a].split(",");
      var newWord = xandy[xandy.length - 1].slice(8);
      words.push(newWord);
      // console.log(newWord);
    }
    sleep(1000);
  }
  this.list = words;
  console.log(words);
  return words;
}

const NewIPFS = async function () {
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
      // console.log("res.data", response.data);
      let page_html = response.data.toString();
      let sepfile = page_html.split("\n");
      return wordGenerator(sepfile);
    })
    // .then((wordArr) => {
    //   return wordArr;
    // })
    .catch((error) => {
      console.error("Error: ", error);
    });
};

NewIPFS();

let wordBankArr = this.list;
console.log(`wordBankArr: ${wordBankArr}`);
module.exports = wordBankArr;

// ----------------------------------

// const urllib = require("urllib");
// const fetch = require("node-fetch");
// // import fetch from "node-fetch";
// // import urllib from "urllib";
// // import fetch from "node-fetch";
// let state = true;
// let apiUrl =
//   "https://api.estuary.tech/collections/content/bfffcaab-d302-4bab-b0ed-552e450a2dc9";

// let options = {
//   method: "GET",
//   contentType: "json",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer EST99cd9b05-5075-47b4-9897-f702f2e2ba2dARY",
//     // 'Content-Length': data.length
//   },
// };
// async function getJson(url, options) {
//   let response = await fetch(url, options);
//   let res = await response.json();
//   return res;
// }

// const sleep = (ms, word) => {
//   new Promise((r) => setTimeout(r, ms));
//   console.log(word);
// };

// // const sleep = (ms, word) =>
// //   new Promise((word) =>
// //     setTimeout(
// //       (word) => {
// //         console.log(word);
// //       },
// //       r,
// //       ms
// //     )
// //   );

// async function printWordPerSecond(word) {
//   sleep(1000, word);
// }
// function wordGenerator(sepfile) {
//   let words = [];
//   for (let a in sepfile) {
//     if (sepfile[a].includes("QBYTE")) {
//       xandy = sepfile[a].split(",");
//       let newWord = xandy[xandy.length - 1].slice(8);
//       // printWordPerSecond(newWord);
//       words.push(newWord);
//       sleep(1000, newWord);
//     }
//   }
//   return words;
// }
// async function NewIPFS() {
//   //OPTION 1
//   getJson(apiUrl, options)
//     .then((data) => {
//       //   console.log(`0 Main data: ${Object.keys(data[0])}`);
//       let latest_cid = data[data.length - 1]["cid"];
//       let dataUrl = `https://${latest_cid}.ipfs.dweb.link`;
//       var httpclient = require("urllib").create();
//       return httpclient.request(dataUrl);
//     })
//     .then((response) => {
//       let page_html = response.data.toString();
//       let sepfile = page_html.split("\n");
//       // console.log(`sepfile ${sepfile}`);
//       return wordGenerator(sepfile);
//     });
// }
// const wordBankArr = NewIPFS();
// module.exports = wordBankArr;
