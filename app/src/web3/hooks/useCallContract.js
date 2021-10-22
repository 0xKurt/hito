import { useState } from "react";
import { useEmptyWeb3 } from ".";
import { ethers } from "ethers";

const useCallContract = () => {
  const web3 = useEmptyWeb3();
  const [callResult, setCallResult] = useState('');


  // example:
  // call({
  //   address: tokenAddress,
  //   abi: Erc20Abi,
  //   method: 'balanceOf',
  //   args: [user]
  // }).then(setBalance(fromWeiToFixed(result, n ? n : 3)))

  const call = async (callData) => {
    const abi = new ethers.utils.Interface(callData.abi) 
    await web3.eth.call({
      to: callData.address,
      from: '0x0000000000000000000000000000000000000000',
      data: abi.encodeFunctionData(callData.method, callData.args)
    }).then(res => {
      setCallResult(res);
    })
  }

  return ({
    callResult, call
  });
}
export default useCallContract;