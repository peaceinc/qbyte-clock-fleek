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
import Plot from 'react-plotly.js';
import { sha256 } from 'js-sha256';
import MIDISounds from 'midi-sounds-react';
//import {sha256} from 'react-native-sha256';
//import {Line} from 'react-chartjs-2';

//Fleek deploy issue. Not catching IntlDon (dont care as much about this but good to know how react works.)
//3d plots ... mus further
//save data and stats with words etc appear dashboard below etc (button rs)

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1, 2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MyHash(message) {
  var hash = sha256.create();
  hash.update(message);
  return hash.hex();
}

//THIS IS WHERE THE MAGIC HAPPENS:
function GetUserPowerball(intlmsg,intldonate) {
    var hashedUser = MyHash(intlmsg)
    let ultSet = []
    for (var i = 0; i < 64; i+=2){
      
      var xx = parseInt(hashedUser.substring(i,i+2),16)
      if (ultSet.includes(xx)==false && xx<250 && ultSet.length < 90) {
        ultSet.push(xx)
      }
      
    }

    while (ultSet.length < 90) {
      var NewHashedUser = MyHash(ultSet)
      for (var i = 0; i < 64; i+=2) {
        var xx = parseInt(NewHashedUser.substring(i,i+2),16)
        if (ultSet.includes(xx)==false && xx<250 && ultSet.length < 90) {
          ultSet.push(xx)
        }

      }
    }

    ultSet.sort(function(a, b){return a-b})

  

  // if (intldonate < 31536000){
  //   //I don't understand why I can't just redefine ultSet here but this works

  //   let xxultSet = [5, 6, 8, 14, 17, 18, 20, 24, 26, 28, 32, 35, 38, 40, 45, 46, 47, 48, 49, 56, 57, 58, 61, 65, 67, 71, 73, 74, 77, 82, 84, 85, 86, 87, 88, 89, 96, 97, 98, 100, 101, 102, 105, 107, 108, 109, 110, 113, 116, 118, 125, 126, 128, 131, 134, 137, 138, 147, 151, 152, 153, 154, 156, 159, 163, 166, 168, 169, 176, 178, 181, 187, 188, 192, 195, 197, 200, 205, 206, 207, 214, 215, 216, 217, 219, 223, 231, 236, 241, 243]

  //   for (var i = 0; i < 90; i++) {
  //     ultSet[i] = xxultSet[i]
  //   }
  // }

  console.log(ultSet)
  return ultSet
}

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
  //console.log(X)
  return Z
}

function int2bitsum(X) {
  var isum = 0
  for (let a in X){
    isum += ByteBankArr[X[a]]
  }
  return isum
}

function GetColors(X) {
  var ColorArr = []
  ColorArr.push(((X[0]*65536)+(X[1]*256)+(X[2])).toString(16))
  ColorArr.push(((X[3]*65536)+(X[4]*256)+(X[5])).toString(16))
  ColorArr.push(((X[6]*65536)+(X[7]*256)+(X[8])).toString(16))
  ColorArr.push(((X[9]*65536)+(X[10]*256)+(X[11])).toString(16))
  ColorArr.push(((X[12]*65536)+(X[13]*256)+(X[14])).toString(16))
  ColorArr.push(((X[15]*65536)+(X[16]*256)+(X[17])).toString(16))
  ColorArr.push(((X[18]*65536)+(X[19]*256)+(X[20])).toString(16))
  ColorArr.push(((X[21]*65536)+(X[22]*256)+(X[23])).toString(16))
  ColorArr.push(((X[24]*65536)+(X[25]*256)+(X[26])).toString(16))
  ColorArr.push(((X[27]*65536)+(X[28]*256)+(X[29])).toString(16))
  return ColorArr
}

function MyAppend(MyArr,MyAdd) {
  let NewArr = MyArr;
  NewArr.push(MyAdd)
  return NewArr
}

function SelectNote(notesinchord) {
  var yournote = notesinchord[parseInt(Math.random()*4)]
  return yournote
}

function ChangeKey(currentseq) {
  var newseq = currentseq
  for (var i = 0; i < 4; i++) {
    if (currentseq[i][0]<50 || currentseq[i][1]<50 || currentseq[i][2]<50 || currentseq[i][3]<50){
      for (var j = 0; j < 4; j++) {
          newseq[i][j] += 10
      }
    } else {
      for (var j = 0; j < 4; j++) {
        newseq[i][j] -= 2
      }
    }
  }
  return newseq
}

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
function ActualRNG(sepfile,xsamp) {
  let bytearr = [];
  //let xsamp = [5, 6, 8, 14, 17, 18, 20, 24, 26, 28, 32, 35, 38, 40, 45, 46, 47, 48, 49, 56, 57, 58, 61, 65, 67, 71, 73, 74, 77, 82, 84, 85, 86, 87, 88, 89, 96, 97, 98, 100, 101, 102, 105, 107, 108, 109, 110, 113, 116, 118, 125, 126, 128, 131, 134, 137, 138, 147, 151, 152, 153, 154, 156, 159, 163, 166, 168, 169, 176, 178, 181, 187, 188, 192, 195, 197, 200, 205, 206, 207, 214, 215, 216, 217, 219, 223, 231, 236, 241, 243]
  for (let a in sepfile) {
    if (sepfile[a].includes("QBYTE")) {
      let xandy = sepfile[a].split(",");
      let newNums = [];
      for (let b in xsamp){
        newNums.push(parseInt(xandy[b]))
      }

      bytearr.push(newNums);
    }
    //sleep(1000);
  }
  return bytearr;
}

function ActualPRNG() {
  let bytearr = [];
  for (var i = 0; i < 600; i++) {
    let ixx = [];
    for (var j = 0; j < 90; j++) {
      ixx.push(parseInt(Math.random()*256))
    }
    bytearr.push(ixx);
  }
  return bytearr;
}

//finds latest CID not already used
function FindLatest(estdat,pastcids) {
  console.log(pastcids)
  let whenarr = [];
  let whenarrunsort = [];
  for (var i=0; i<estdat.length; i++) {
    whenarr.push(estdat[i]["updatedAt"])
    whenarrunsort.push(estdat[i]["updatedAt"])
  }
  whenarr.sort();
  var nowcid = 'xxx';
  var i = 1;
  while (pastcids.includes(nowcid) || i==1) {
    let latesttime = whenarr[whenarr.length -i];
    let latestidx = whenarrunsort.indexOf(latesttime);
    var nowcid = estdat[latestidx]["cid"];
    i++;
  }

  return nowcid
}

class RandomBytes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IntlHashMsg: this.props.IntlHashMsg,
      IntlDon: this.props.IntlDon,
      boxChars: getPseudoRandomBytes(),
      byteInteger: getPseudoRandomBytes()[8],
      byteIntegerSum: 0,
      Ncount: 0,
      RunningZ: 0.0,
      currentWord: "loading...",
      gotWord: "fjords",
      usersbytes: [],
      RunningZX: [],
      RunningZY: [],
      CurrentColors: [],
			selectedInstrument: 797,
			cached:true,
      PlayingOrNot: 0,
      ChordSeq: [[60,64,67,72],[60,65,68,72],[60,64,67,72],[60,65,69,72]],
      ChordActive: 0,
      UsedCIDs: [],
    };
  }

  // collections b5864e77-7403-4a39-b573-e122fb87267f 47334123-5caa-4d98-9440-3b2412579842
  
  componentDidMount() {
    //let Zct = 0
    this.setState(this.state);

    console.log(this.state.IntlDon, "intl don");
    
    axios
      .get(
        "https://api.estuary.tech/collections/content/47334123-5caa-4d98-9440-3b2412579842",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EST99cd9b05-5075-47b4-9897-f702f2e2ba2dARY",
          },
        }
      )
      .then((res) => {
        var latest_cid = FindLatest(res.data,this.state.UsedCIDs);
        this.setState({
          UsedCIDs: MyAppend(this.state.UsedCIDs,latest_cid),
        });
        let dataUrl = `https://${latest_cid}.ipfs.dweb.link`;
        console.log(dataUrl);
        console.log(this.state.UsedCIDs)
        return axios.get(dataUrl);
      })
      .then((response) => {
        let page_html = response.data.toString();
        let sepfile = page_html.split("\n");
        //console.log(ActualRNG(sepfile))
        //console.log(parseInt(ActualRNG(sepfile)[14][3])+parseInt(ActualRNG(sepfile)[15][3]))
        
        return ActualRNG(sepfile,GetUserPowerball(this.state.IntlHashMsg,this.state.IntlDon));
      })
      .then((array) => {
        this.setState({
          usersbytes: array,
        });
        console.log("succesful estuary pull")
      })
      .catch((error) => {
        console.error("Error: ", error);
        console.log("using PRNG instead");
        this.setState({
          usersbytes: ActualPRNG(),
        });
      });
    

    this.timeout = setInterval(() => {

      if (this.state.Ncount%this.state.usersbytes.length==0 && this.state.Ncount>10) {
        axios
        .get(
          "https://api.estuary.tech/collections/content/47334123-5caa-4d98-9440-3b2412579842",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer EST99cd9b05-5075-47b4-9897-f702f2e2ba2dARY",
            },
          }
        )
        .then((res) => {
          var latest_cid = FindLatest(res.data,this.state.UsedCIDs)//res.data[res.data.length - 1]["cid"];
          this.setState({
            UsedCIDs: MyAppend(this.state.UsedCIDs,latest_cid),
          });
          let dataUrl = `https://${latest_cid}.ipfs.dweb.link`;
          console.log(dataUrl)
          console.log(this.state.UsedCIDs,"ALL USED CIDS")
          return axios.get(dataUrl);
        })
        .then((response) => {
          let page_html = response.data.toString();
          let sepfile = page_html.split("\n");
          //console.log(ActualRNG(sepfile))
          //console.log(parseInt(ActualRNG(sepfile)[14][3])+parseInt(ActualRNG(sepfile)[15][3]))
          
          return ActualRNG(sepfile,GetUserPowerball(this.state.IntlHashMsg,this.state.IntlDon));
        })
        .then((array) => {
          this.setState({
            usersbytes: array,
          });
          console.log("succesful estuary pull")
        })
        .catch((error) => {
          console.error("Error: ", error);
          console.log("using PRNG instead");
          this.setState({
            usersbytes: ActualPRNG(),
          });
        });
      }


      let newBytes = getPseudoRandomBytes();
      let currentbytesum = int2bitsum(this.state.usersbytes[this.state.Ncount%this.state.usersbytes.length])
      let MyColors = GetColors(this.state.usersbytes[this.state.Ncount%this.state.usersbytes.length])
      let NewZscore = GetRunningZ(this.state.byteIntegerSum + currentbytesum, this.state.Ncount + 1)
      this.setState({
        boxChars: newBytes,
        byteInteger: newBytes[8],
        byteIntegerSum: this.state.byteIntegerSum + currentbytesum,
        //currentWord: this.state.words[newBytes[8]],
        //currentWord: this.state.words[this.state.Ncount%this.state.words.length],
        currentWord: wordBankArr[(this.state.usersbytes[this.state.Ncount%this.state.usersbytes.length][89]*256)+(this.state.usersbytes[this.state.Ncount%this.state.usersbytes.length][88])],
        Ncount: this.state.Ncount + 1,
        RunningZ: NewZscore,
        RunningZX: MyAppend(this.state.RunningZX, this.state.Ncount + 1),
        RunningZY: MyAppend(this.state.RunningZY,NewZscore),
        CurrentColors: MyColors,
        //RunningZX: this.state.usersbytes.push(14),
        //RunningZX: MyAppend(this.state.RunningZX.slice(),this.state.Ncount + 1),
        //RunningZY: MyAppend(this.state.RunningZY.slice(),GetRunningZ(this.state.byteIntegerSum + currentbytesum, this.state.Ncount + 1))
      });

      var SwitchFx = this.state.usersbytes[this.state.Ncount%this.state.usersbytes.length][69]//parseInt(Math.random()*256)
      var MyNote = SwitchFx % 4
      if (SwitchFx > 250) {
        if (this.state.ChordActive == 3) {
          this.setState({
            ChordSeq: ChangeKey(this.state.ChordSeq),
            ChordActive: 0
          })
        } else{
          this.setState({
            ChordActive: this.state.ChordActive + 1
          })
        }
      }
      if (this.state.PlayingOrNot > 0) {
        this.midiSounds.playChordNow(this.state.selectedInstrument, [(this.state.ChordSeq[this.state.ChordActive])[MyNote]], 0.3);
      }
      //console.log(this.state.RunningZY)
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
	onSelectInstrument(e){
		var list=e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");
		this.setState({
			selectedInstrument: n
			,cached:false
		});
		this.midiSounds.cacheInstrument(n);
		var me=this;
		this.midiSounds.player.loader.waitLoad(function () {
			me.setState({
				selectedInstrument: n
				,cached:true
			});
		});
	}
	createSelectItems() {
		if (this.midiSounds) {
			if (!(this.items)) {
				this.items = [];
				for (let i = 0; i < this.midiSounds.player.loader.instrumentKeys().length; i++) {
					this.items.push(<option key={i} value={i}>{'' + (i + 0) + '. ' + this.midiSounds.player.loader.instrumentInfo(i).title}</option>);
				}
			}
			return this.items;
		}
	}
	playTestInstrument() {
		//this.midiSounds.playChordNow(this.state.selectedInstrument, [60,64,67,72], 1);
    if (this.state.PlayingOrNot == 0) {
      this.setState({
        PlayingOrNot: 1
      })
    }
    else {
      this.setState({
        PlayingOrNot: 0
      })
    }
    
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
        Debug stats: {this.state.Ncount} {this.state.usersbytes.length}
        <p><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItems()}</select></p>
		    <p><button onClick={this.playTestInstrument.bind(this)} disabled={!this.state.cached}>Toggle Sound</button></p>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[4]} />	
        <Plot
            data={[
              {
                x: this.state.RunningZX.slice(),
                y: this.state.RunningZY.slice(),
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'red'},
              },
              //{type: 'bar', x: [1, 2, 3], y: [2, 9, 3]},
            ]}
            layout={{width: 600, height: 400, title: 'Running Z History'}}
          />
        <Plot
            data={[
              {
                x: [1.0, 0.81, 0.31, -0.31, -0.81, -1.0, -0.81, -0.31, 0.31, 0.81],
                y: [0.0, 0.59, 0.95, 0.95, 0.59, 0.0, -0.59, -0.95, -0.95, -0.59],
                type: 'scatter',
                mode: 'markers',
                marker: {

                  size: 40,
              
                  color: this.state.CurrentColors
              
                }
              },
              //{type: 'bar', x: [1, 2, 3], y: [2, 9, 3]},
            ]}
            layout={{width: 600, height: 400, title: this.state.currentWord}}
          />
      </div>
    );
  }
}

export default RandomBytes;
//        Running Z: {this.state.RunningZ.toFixed(2)}



