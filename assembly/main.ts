import { PostedMessage, messages } from './model';
import { storage, Context, RNG, logging, u128 } from "near-sdk-as"

// --- contract code goes below

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 10;

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(): void {
  // Creating a new message and populating fields with our data
  const paid: u128 = Context.attachedDeposit
  const paidstr: string = paid.toString()
  // console.log(paidstr)
  const message = new PostedMessage(paidstr);
  // Adding the message to end of the persistent collection
  messages.push(message);
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  logging.log("hello");
  for(let i = 0; i < numMessages; i++) {
    //console.log("hello")
    result[i] = messages[i + startIndex];
    //logging.log(Context.sender);
    //logging.log(messages[i + startIndex].sender);
    //if (messages[i + startIndex].sender = Context.sender) {
    //  result[i] = messages[i + startIndex];
    //}
    
  }
  return result;
}
