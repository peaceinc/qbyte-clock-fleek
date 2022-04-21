import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';
//import Messages from './components/Messages';
import Display from './components/Display';
//import Clock from './components/clock';


const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [donationvalue, setDonation] = useState([]);

  
  useEffect(() => {

    try{
      contract.get_donation({
        account_id: currentUser.accountId,
        }).then(setDonation);

        console.log(contract.get_donation({
          account_id: currentUser.accountId,
          }))

    } catch {

      contract.get_donation({
        account_id: 'notloggedin',
        }).then(setDonation);

    }
    console.log({donationvalue})



  }, []);


  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract.update_donation(
      {  },
      BOATLOAD_OF_GAS,
      Big(donation.value || '0').times(10 ** 24).toFixed()
    );



  };

  function onSubmitData(e,value) {
    e.preventDefault();

    contract.update_storestr(
      { "mystr":value },
      BOATLOAD_OF_GAS,
    );

  };

  const signIn = () => {
    wallet.requestSignIn(
      {contractId: nearConfig.contractName, methodNames: [contract.update_donation.name]}, //contract requesting access
      'NEAR Guest Book', //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  // const amt_donated = contract.get_donation({
  //   account_id: currentUser.accountId
  // });

  return (
    <main>
      <header>
      <p className="App-title">
            <code className="first-letter" id="first-letter-1">
              H
            </code>
            <font color='black'>ypercube{" "}</font>
            <code className="first-letter" id="first-letter-2">
              A
            </code>
            <font color='black'>lgorithmic{" "}</font>
            <code className="first-letter" id="first-letter-3">
              L
            </code>
            <font color='black'>anguage{" "}</font>
            <code className="first-letter" id="first-letter-4">
              O
            </code>
            <font color='black'>racle</font>
          </p>
        
        { currentUser
          ? <button onClick={signOut}><font color='black'>Log out</font></button>
          : <button onClick={signIn}><font color='black'>Log In</font></button>
        }
      </header>
      { currentUser
        ? <Form onSubmit={onSubmit} currentUser={currentUser} />
        //? <Display currentUser={currentUser} />
        : <SignIn/>
      }
      
      { !!currentUser && !!contract && <Display currentUser={currentUser} contract={contract} onSubmitData={onSubmitData}/> }
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    update_donation: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
