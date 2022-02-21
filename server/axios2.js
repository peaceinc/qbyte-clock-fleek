const axios = require("axios");

const wordBank = async function () {
  axios
    .get(
      "https://api.estuary.tech/collections/content/bfffcaab-d302-4bab-b0ed-552e450a2dc9",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer EST99cd9b05-5075-47b4-9897-f702f2e2ba2dARY",
        },
      }
    )
    .then((res) => {
      var latest_cid = res.data[res.data.length - 1]["cid"];
      var dataUrl = `https://${latest_cid}.ipfs.dweb.link`;
      // var httpclient = urllib.create();
      // return httpclient.request(dataUrl);
      return axios.get(dataUrl).then((response) => {
        let page_html = response.data.toString();
        let sepfile = page_html.split("\n");
        // console.error("sepfile: ", sepfile);
        let words = [];
        for (var a in sepfile) {
          if (sepfile[a].includes("QBYTE")) {
            var xandy = sepfile[a].split(",");
            var newWord = xandy[xandy.length - 1].slice(8);
            // console.log("newWord", newWord);

            words.push(newWord);
            // console.log(newWord);
          }
        }
        // console.log(words);
        this.wordBankArr = words;
        return words;
      });
    });
};

this.wordBankArr = wordBank();

console.log(this.wordBankArr);

module.exports = wordBank();
