import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function Form({ onSubmitData, passedMessage }) {
  return (
    <form onSubmit={(e)=>onSubmitData(e,passedMessage)}>
        <button type="submit">
          <font color='white'>
          Save Data (on-chain)
          </font>
        </button>
    </form>
  );
}

Form.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
};
