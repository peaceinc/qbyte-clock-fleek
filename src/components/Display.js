import React, { Component } from "react";
import logo from "../Asset15.png";
import "../App.css";
import { StyledEngineProvider } from "@mui/material/styles";
import RandomBytes from "./RandomBytes";
import Clock from "./clock";
import YoutubeEmbed from "./YoutubeEmbed";
//import Clock from 'react-clock';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDonation: 0,
      currentUser: this.props.currentUser,
      contract: this.props.contract,
      displayClock: false,
      displayAEM: false,
      displayHC: false,
      displayMidi: false,
      displayOracle: false,
      hideDisplay: {
        display: "none",
      },
      showDisplay: {
        display: "contents",
      },
    };
  }

  componentDidMount() {
    this.state.contract
      .get_donation({
        account_id: this.state.currentUser.accountId,
      })
      .then((amt_donated) => {
        this.setState({
          currentDonation: amt_donated,
        });
        if (this.state.currentDonation > 0.9) {
          this.setState({
            displayClock: true,
          });
        }
        if (this.state.currentDonation > 27182818) {
          this.setState({
            displayAEM: true,
          });
        }
        if (this.state.currentDonation > 31415927) {
          this.setState({
            displayHC: true,
          });
        }
        if (this.state.currentDonation > 10000000000000000000000) {
          this.setState({
            displayMidi: true,
          });
        }
        if (this.state.currentDonation > 100000000000000000000000) {
          this.setState({
            displayOracle: true,
          });
        }
      });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <font size="6">
              Hybrid-Quantum Computing Spatial Relativity Time Dilation Clock
              with Non-deterministic Machine Learning Language Oracle{" "}
            </font>
          </p>
          <p>
            <font size="5">
              Welcome to the Q-Byte Clock, {this.state.currentUser.accountId}!
              You have donated {this.state.currentDonation/(1000000000000000000000000)} NEAR.
            </font>
          </p>
          <p>
            <font size="5">
              Donation Tiers (1 Yocto NEAR = 0.000000000000000000000001 NEAR):
              <br></br>
              <br></br>
              1 Yocto NEAR: unlocks the basic clock with 1 word displayed per second
              <br></br>
              <br></br>
              27182818 Yocto NEAR: Unlocks the AEtherspheric Modulator (2 dimensional array of colors)
              <br></br>
              <br></br>
              31415927 Yocto NEAR: Unlocks the Hypercube (3 dimensional array of colors)
              <br></br>
              <br></br>
              0.01 NEAR: Unlocks sound effects (you can turn these on and off)
              <br></br>
              <br></br>
              0.1 NEAR: Unlocks word oracle
              <br></br>
              <br></br>
              1 NEAR: Data stream is personalized to your NEAR address
            </font>
          </p>
          <p>
            <font size="5">
              The Q-Byte Clock tells the time while demonstrating what time is.
              The full user experience is coming soon, meanwhile, you can access
              interactive graphs and visuals from our Github.
            </font>
          </p>
          <a
            className="App-link"
            href="https://peacemuseum.wixsite.com/mysite/model"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit haloai.me Q-Byte Page
          </a>
          <a
            className="App-link"
            href="https://github.com/peaceinc/qbyte"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Repository for QByte Clock
          </a>
          <a
            className="App-link"
            href="https://www.youtube.com/watch?v=3XkcAKzz61Q"
            target="_blank"
            rel="noopener noreferrer"
          >
            Video Explanation for QByte Clock Data
          </a>

          <div
            style={
              this.state.displayClock
                ? this.state.showDisplay
                : this.state.hideDisplay
            }
          >
            <StyledEngineProvider injectFirst>
              <Clock />
              <RandomBytes IntlHashMsg={this.state.currentUser.accountId} IntlDon={this.state.currentDonation} showAEM={this.state.displayAEM} showHC={this.state.displayHC} showMidi={this.state.displayMidi} showOracle={this.state.displayOracle} />
            </StyledEngineProvider>
          </div>
        </header>

        <img src={logo} className="App-logo" alt="logo" />
        <YoutubeEmbed embedId="Zlc3stcYAmI" />
      </div>
    );
  }
}

export default Display;