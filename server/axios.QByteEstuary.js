const subprocess = require("subprocess");
const urllib = require("urllib");
const request = require("request");
const axios = require("axios");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function wordGenerator(sepfile) {
  let words = [];
  for (let a in sepfile) {
    if (sepfile[a].includes("QBYTE")) {
      xandy = sepfile[a].split(",");
      var newWord = xandy[xandy.length - 1].slice(8);
      // printWordPerSecond(newWord);
      words.push(newWord);
      console.log(newWord);
    }
    sleep(1000);
  }
  return words;
}
var words = [];
const NewIPFS = async function (words) {
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
  // var estuary_json_req = request.get(url, options, (err, data, res));

  axios
    .get(url, options)
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      var latest_cid = res.data[res.data.length - 1]["cid"];
      console.log(res.data[res.data.length - 1]["cid"]);

      let dataUrl = `https://${latest_cid}.ipfs.dweb.link`;
      var httpclient = require("urllib").create();
      return httpclient.request(dataUrl);
      var uClient = urllib.request(data);

      var page_html = uClient.toString();
      console.log(`page_html: ${page_html}`);
      var sepfile = page_html.split("\\n");
      console.log(`sepfile: ${sepfile}`);
      console.log(sepfile[0].indexOf("QBYTE"));
      for (var a = 0; a < sepfile.length; a++) {
        if (sepfile[a].includes("QBYTE")) {
          let xandy = sepfile[a].split(",");
          words.push(xandy[xandy.length - 1].slice(8));
          console.log(`words: ${words}`);
        }
      }
      console.log(`wordsEnded: ${words}`);
      return words;
      // console.log(`words: ${words}`);
    })
    .then((response) => {
      let page_html = response.data.toString();
      let sepfile = page_html.split("\n");
      // console.log(`sepfile ${sepfile}`);
      wordGenerator(sepfile);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  // return words;
};

// while (true) {
//   let new_words = NewIPFS();
//   for (var a = 0; a < new_words.length; a++) {
//     console.log(new_words[a]);
//     sleep(1000);
//   }
// }

let new_words = NewIPFS([]);
console.log(`new_words: ${new_words}`);
sleep(1000);
