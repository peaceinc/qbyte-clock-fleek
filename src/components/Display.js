import React from 'react';
import logo from "../Asset15.png";
import "../App.css";
import { StyledEngineProvider } from "@mui/material/styles";
import RandomBytes from "./RandomBytes";
//import Clock from 'react-clock';

export default function Display({ currentUser }) {
  return (
    <div className="App">
      <header className="App-header">
        <heading className="App-heading">
          <p className="App-title">
            <code className="first-letter" id="first-letter-1">
              H
            </code>
            ypercube{" "}
            <code className="first-letter" id="first-letter-2">
              A
            </code>
            lgorithmic{" "}
            <code className="first-letter" id="first-letter-3">
              L
            </code>
            anguage{" "}
            <code className="first-letter" id="first-letter-4">
              O
            </code>
            racle
          </p>
          <p>
            <code>Welcome to your personal time machine, { currentUser.accountId }!</code>
          </p>
        </heading>
        <a
          className="App-link"
          href="https://www.haloai.me/sample-data-title"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit haloai.me Q-Byte Page
        </a>
        <StyledEngineProvider injectFirst>
          <RandomBytes />
        </StyledEngineProvider>
      </header>

      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

