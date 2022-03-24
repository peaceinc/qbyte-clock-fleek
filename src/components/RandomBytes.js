import React, { Component } from "react";
// import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RandomWord from "./RandomWord";
import axios from "axios";
import wordBankArr from "./wordBank";
import ByteBankArr from "./byteBank";
//import {Line} from 'react-chartjs-2';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1, 2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function getPseudoRandomBytes() {
  let arr = [];
  for (var i = 0; i < 8; i++) {
    arr[i] = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
  }
  let intConvert = bytesToInt(arr);
  arr.push(intConvert);
  //console.log(arr)
  return arr;
}

function bytesToInt(bytes) {
  var int = parseInt(bytes.join(""), 2);
  return int;
}

function GetRunningZ(X, N) {
  var numerator = X - (N*8*90*0.5)
  var denominator = Math.sqrt(N*8*90*0.25)
  var Z = numerator/denominator
  return Z
}

function int2bitsum(X) {
  var isum = 0
  for (let a in X){
    isum += ByteBankArr[X[a]]
  }
  return isum
}

// function get_line(filename, line_no, callback) {
//   var stream = fs.createReadStream(filename, {
//     flags: "r",
//     encoding: "utf-8",
//     fd: null,
//     // mode: 0666,
//     bufferSize: 64 * 1024,
//   });

//   var fileData = "";
//   stream.on("data", function (data) {
//     fileData += data;

//     // The next lines should be improved
//     var lines = fileData.split("\n");

//     if (lines.length >= +line_no) {
//       stream.destroy();
//       callback(null, lines[+line_no]);
//     }
//   });

//   stream.on("error", function () {
//     callback("Error", null);
//   });

//   stream.on("end", function () {
//     callback("File end reached without finding line", null);
//   });
// }

// get_line("./Wordbank.txt", 0, function (err, line) {
//   console.log("The line: " + line);
// });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function wordGenerator(sepfile) {
  let words = [];
  for (let a in sepfile) {
    if (sepfile[a].includes("QBYTE")) {
      let xandy = sepfile[a].split(",");
      var newWord = xandy[xandy.length - 1].slice(8);
      words.push(newWord);
    }
    sleep(1000);
  }
  // console.log(words);
  return words;
}

//every second, based on the hash of user, pull 90 unique bytes from QBYTE line and use as their data and to draw colors, generate words, see trends, etc. 30 nodes max so 90 bytes. for now randomly select or hardcode these rather than hash. don't want to do too much processing on user side. This will render all at once. Also need auto-reload page every 10 min but may be problem saving state/graph unless save to blockchain
function ActualRNG(sepfile) {
  let bytearr = [];
  let xsamp = [5, 6, 8, 14, 17, 18, 20, 24, 26, 28, 32, 35, 38, 40, 45, 46, 47, 48, 49, 56, 57, 58, 61, 65, 67, 71, 73, 74, 77, 82, 84, 85, 86, 87, 88, 89, 96, 97, 98, 100, 101, 102, 105, 107, 108, 109, 110, 113, 116, 118, 125, 126, 128, 131, 134, 137, 138, 147, 151, 152, 153, 154, 156, 159, 163, 166, 168, 169, 176, 178, 181, 187, 188, 192, 195, 197, 200, 205, 206, 207, 214, 215, 216, 217, 219, 223, 231, 236, 241, 243]
  for (let a in sepfile) {
    if (sepfile[a].includes("QBYTE")) {
      let xandy = sepfile[a].split(",");
      let newNums = [];
      for (let b in xsamp){
        newNums.push(parseInt(xandy[b]))
      }

      bytearr.push(newNums);
    }
    sleep(1000);
  }
  return bytearr;
}


class RandomBytes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxChars: getPseudoRandomBytes(),
      byteInteger: getPseudoRandomBytes()[8],
      byteIntegerSum: 0,
      Ncount: 0,
      RunningZ: 0.0,
      currentWord: "problematic",
      gotWord: "fjords",
      usersbytes: [],
    };
  }



  componentDidMount() {
    //let Zct = 0
    let wordArr = axios
      .get(
        "https://api.estuary.tech/collections/content/b5864e77-7403-4a39-b573-e122fb87267f",
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
        let dataUrl = `https://${latest_cid}.ipfs.dweb.link`;
        console.log(dataUrl)
        return axios.get(dataUrl);
      })
      .then((response) => {
        let page_html = response.data.toString();
        let sepfile = page_html.split("\n");
        console.log(ActualRNG(sepfile))
        //console.log(parseInt(ActualRNG(sepfile)[14][3])+parseInt(ActualRNG(sepfile)[15][3]))
        return ActualRNG(sepfile);
      })
      .then((array) => {
        this.setState({
          usersbytes: array,
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    this.timeout = setInterval(() => {
      let newBytes = getPseudoRandomBytes();
      let currentbytesum = int2bitsum(this.state.usersbytes[this.state.Ncount%this.state.usersbytes.length])
      this.setState({
        boxChars: newBytes,
        byteInteger: newBytes[8],
        byteIntegerSum: this.state.byteIntegerSum + currentbytesum,
        //currentWord: this.state.words[newBytes[8]],
        //currentWord: this.state.words[this.state.Ncount%this.state.words.length],
        currentWord: wordBankArr[(this.state.usersbytes[this.state.Ncount%this.state.usersbytes.length][89]*256)+(this.state.usersbytes[this.state.Ncount%this.state.usersbytes.length][88])],
        Ncount: this.state.Ncount + 1,
        RunningZ: GetRunningZ(this.state.byteIntegerSum + currentbytesum, this.state.Ncount + 1)
      });
      //console.log(int2bitsum(this.state.usersbytes[this.state.Ncount%this.state.usersbytes.length]))
      //console.log(this.state.usersbytes[this.state.Ncount%this.state.usersbytes.length].reduce((result,number)=> result+number))
      //zct += this.state.byteInteger
      //console.log(this.state.byteIntegerSum, this.state.Ncount, this.state.RunningZ)
      // .then(
      //   axios.get(`/word/${this.state.byteInteger}`).then((res) => {
      //     console.log(res);
      //     this.setState({
      //       gotWord: this.state.byteInteger,
      //     });
      //   })
      // )
      // .then(() => console.log("get req successful", this.state.currentWord))
      // .catch((err) => console.log(`Error getting word:\n${err}`));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    return (
      <div>
        <Box paddingBottom="20px">
          <Grid container spacing={0.5}>
            <Grid item xs={1.5}>
              <Item>{this.state.boxChars[0]}</Item>
            </Grid>
            <Grid item xs={1.5}>
              <Item>{this.state.boxChars[1]}</Item>
            </Grid>
            <Grid item xs={1.5}>
              <Item>{this.state.boxChars[2]}</Item>
            </Grid>
            <Grid item xs={1.5}>
              <Item>{this.state.boxChars[3]}</Item>
            </Grid>
            <Grid item xs={1.5}>
              <Item>{this.state.boxChars[4]}</Item>
            </Grid>
            <Grid item xs={1.5}>
              <Item>{this.state.boxChars[5]}</Item>
            </Grid>
            <Grid item xs={1.5}>
              <Item>{this.state.boxChars[6]}</Item>
            </Grid>
            <Grid item xs={1.5}>
              <Item>{this.state.boxChars[7]}</Item>
            </Grid>
          </Grid>
        </Box>
        <Box paddingBottom="18px">
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <span> {this.state.boxChars[8]}</span>
            </Grid>
          </Grid>
        </Box>
        <RandomWord word={this.state.currentWord} />
        Running Z: {this.state.RunningZ.toFixed(2)}
      </div>
    );
  }
}

export default RandomBytes;
