//use super::{Receipt, VmAction};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap};
use near_sdk::{env, near_bindgen, AccountId, Promise};
use std::convert::{TryInto};


// use crate::{
//     types::{Balance, Gas},
//     PublicKey,
// };
// use near_vm_logic::types::AccountId as VmAccountId;
// use near_vm_logic::{External, HostError, ValuePtr};
// use std::{collections::HashMap, convert::TryFrom};

// type Result<T> = ::core::result::Result<T, near_vm_logic::VMLogicError>;

near_sdk::setup_alloc!();


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Counter {
    donation: LookupMap<AccountId,u128>, 
    storestr: LookupMap<AccountId,String>, 
}


impl Default for Counter {
    fn default() -> Self {
        Self {
            donation: LookupMap::new(b"t"),
            storestr: LookupMap::new(b"z"),
        }
    }
}

#[near_bindgen]
impl Counter {
    
    #[payable]
    pub fn update_donation(&mut self){
        let account_id = env::signer_account_id();
        let added_donation = env::attached_deposit();

        // `FromStr` conversion
        //let alice: AccountId = "guest-qbyte3.testnet".parse().unwrap();
        //assert!("invalid.".parse::<AccountId>().is_err());

        let alice_string = "peace-inc.sputnikv2.testnet".to_string();

        // // From string with validation
        //let alice = AccountId::try_from(alice_string.clone()).unwrap();
        let alice: AccountId = alice_string.try_into().unwrap();

        // Initialize without validating
        //let alice_unchecked = AccountId::new_unchecked("alice".to_string());
        //assert_eq!(alice, alice_unchecked);

        if added_donation>0{
            Promise::new(alice).transfer(u128::from(added_donation));
        }
        let current_count; 
        match self.donation.get(&account_id){
            Some(donation_val)=>current_count=donation_val,
            None => current_count=0
        };
        let new_count=current_count+added_donation;
        self.donation.insert(&account_id,&new_count);
    }


    pub fn update_storestr(&mut self, mystr:String){
        let account_id = env::signer_account_id();
        let added_storestr = mystr;

        let current_str; 
        match self.storestr.get(&account_id){
            Some(storestr_val)=>current_str=storestr_val,
            None => current_str="".to_string()
        };
        let new_str=current_str+&added_storestr;
        self.storestr.insert(&account_id,&new_str);
    }


    // fn append_action_transfer(&mut self, receipt_index: u64, amount: u128) -> Result<()> {
    //     self.receipts
    //         .get_mut(receipt_index as usize)
    //         .unwrap()
    //         .actions
    //         .push(VmAction::Transfer { deposit: amount });
    //     Ok(())
    // }
    
    pub fn get_donation(&self, account_id:String)->u128{
        match self.donation.get(&account_id){
            Some(donation_val)=> donation_val,
            None => 0
        }
    }


    pub fn get_storestr(&self, account_id:String)->String{
        match self.storestr.get(&account_id){
            Some(storestr_val)=> storestr_val,
            None => "".to_string()
        }
    }
        
}