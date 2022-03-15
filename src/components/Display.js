import React, { Component } from "react";
import logo from "../Asset15.png";
import "../App.css";
import { StyledEngineProvider } from "@mui/material/styles";
import RandomBytes from "./RandomBytes";
import Clock from "./clock";
//import Clock from 'react-clock';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDonation: 0,
      currentUser: this.props.currentUser,
      contract: this.props.contract,
      displayClock: false,
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
        if (this.state.currentDonation > 0.01) {
          this.setState({
            displayClock: true,
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
              You have donated {this.state.currentDonation} YACHTO.
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
            href="https://www.haloai.me/sample-data-title"
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
              <RandomBytes />
            </StyledEngineProvider>
          </div>
        </header>

        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default Display;
