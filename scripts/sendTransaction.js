/**
 * SendTransaction example
 * Result of getTransactionReceipt() if the transaction is mined.
 * { blockHash: '0x2c4fa1b1afec375dc76baf11af4f6b7f82c54a4194495e169a56080dfea86e76',
 *   blockNumber: 214,
 *   contractAddress: null,
 *   cumulativeGasUsed: 21000,
 *   from: '0xc78f884f551036f1510fd81fd0bd9d407f3fae50',
 *   gasUsed: 21000,
 *   logs: [],
 *   logsBloom: ''
 *   root: '0x1f3011cb22ceb84de705e048320063b73038175ef8e47130d7fe42384d26836d',
 *   to: '0x7b0364113bd8624a95e89a064a879c9a1aac2b0e',
 *   transactionHash: '0xa391abee069753aee3ae35e6d4f25b79ee2ec72a467b7551ddb9d4ec702f8dea',
 *   transactionIndex: 0 
 *   }
*/


const Web3 = require('web3');
const readline = require('readline-sync');

var fromAccount = web3.eth.accounts[0]
var toAccount = web3.eth.accounts[1]
var accountPasswd = '1'
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


function unlockAccount(func){
    web3.personal.unlockAccount(fromAccount, accountPasswd, function(error, result){
        if(error) {
            console.log("Unlock account failed:", error);
        } else {
            func()
        }
    });
}


function sendTransaction(){
    var txn = {
        "from": fromAccount,
        "to": toAccount,
        "value": web3.toWei(1, 'ether'),
        // "gas": 21000,          // (optional)
        // "gasPrice": 4500000,   // (optional)
        // "data": 'For testing', // (optional)
        // "nonce": 10            // (optional) 
    };

    web3.eth.sendTransaction(txn, function(error, result) {
        if(error) {
            console.log("Send Transaction Error:", error);
        } else {
            var txn_hash = result
            console.log("TxHash:", txn_hash)
            readline.question("Enter to continue if block is mined");
            web3.eth.getTransactionReceipt(txn_hash, function(error, result){
                if(error) {
                    console.log("Get Transaction Receipt Error:", error);
                } else {
                    console.log("Result:", result);
                }
            })
        }
    });
}


// Execute Script
unlockAccount(sendTransaction);