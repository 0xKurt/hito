import { ethers } from "ethers";
import { useConnectedAccount, useConnectedWeb3, useTriggerEvent } from ".";
import { wait } from "../utils/func";
const emitter = require('events').EventEmitter;

const useSendTransaction = () => {
  const { web3, } = useConnectedWeb3();
  const { account, } = useConnectedAccount();
  const { event, trigger } = useTriggerEvent();
  // send({
  //   address: contractAddress,
  //   abi: contractAbi,
  //   method: 'setOwner',
  //   args: [ownerAddress]
  // }).then(console.log(status))

  const onHashReceived = async (e, hash, txData) => {
    e.emit('transactionHash', hash);
    let receipt = null;
    let counter = 0;

    while ((receipt = await web3.eth.getTransactionReceipt(hash)) === null) { // wait for receipt
      await wait(25).then( () => {
        if(counter++ > 100) {
          e.emit('error', 'no receipt') 
          return;
        }
      })
    }

    e.emit('receipt', receipt);

    let block = receipt.blockNumber;
    let confirmedBlock = block + (txData.confirmations ? txData.confirmations : 4)
    let latestBlock = block;

    while (latestBlock <= confirmedBlock) { // wait for confirmations
      await wait(15).then( async () => {
        let fullBlock = await web3.eth.getBlock("latest")
        latestBlock = fullBlock.number;
      })
    }

    await web3.eth.clearSubscriptions()
    e.emit('confirmation', latestBlock - block);
    trigger();
  }

  const send = (txData) => {
    let e = new emitter();

    if (web3 && account) {
      const abi = new ethers.utils.Interface(txData.abi)
      const methodData = abi.encodeFunctionData(txData.method, txData.args)
        try {
          web3.eth.sendTransaction({
            to: txData.address,
            from: account,
            data: methodData
          }).on("transactionHash", async (hash) => {
            onHashReceived(e, hash, txData)
          }).catch(error => {
            e.emit('error', error)
            web3.eth.clearSubscriptions()
          })
        } catch (error) {
          e.emit('error', error)
          web3.eth.clearSubscriptions()
        } 
    } else {
      e.emit('error', 'user not connected')
      web3.eth.clearSubscriptions()
    }
    return e;
  }

  return (send);
}

export default useSendTransaction;