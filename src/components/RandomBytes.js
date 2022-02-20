import React, { Component } from "react";
// import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RandomWord from "./RandomWord";
import axios from "axios";
import wordBankArr from "./wordBank";

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
  return arr;
}

function bytesToInt(bytes) {
  var int = parseInt(bytes.join(""), 2);
  return int;
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

class RandomBytes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxChars: getPseudoRandomBytes(),
      byteInteger: getPseudoRandomBytes()[8],
      currentWord: "haphazard",
      gotWord: "fjords",
    };
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      let newBytes = getPseudoRandomBytes();
      this.setState({
        boxChars: newBytes,
        byteInteger: newBytes[8],
        currentWord: wordBankArr[newBytes[8]],
      });
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
      </div>
    );
  }
}

export default RandomBytes;
