import React from 'react';
import PropTypes from 'prop-types';

export default function Messages({ messages }) {

  const items = messages.map((message, i) => parseInt(message.text))
  //const items = [1,2,3,4,5];
  const sum =  items.reduce((result,number)=> result+number);
  



  return (
    <>
      <h2>Messages</h2>
      {messages.map((message, i) =>
        // TODO: format as cards, add timestamp
        <p key={i} className={message.premium ? 'is-premium' : ''}>
          <strong>{message.sender}</strong>:<br/>
          {sum}
        </p>
      )}

      

    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array
};
