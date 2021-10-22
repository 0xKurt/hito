import { useEffect, useState } from "react";
import { useCallContract } from ".";
import { fromWeiToFixed, isAddress } from "../utils/func";
import useTriggerEvent from './internal/useTriggerEvent'
import Erc20Abi from '../utils/Erc20Abi.json'

const useErc20BalanceOf = (token, user, n) => {
  const { callResult, call } = useCallContract();
  const [balance, setBalance] = useState('');
  const { event, } = useTriggerEvent();

  const checkAddress = (address) => {
    return isAddress(address);
  }

  useEffect(async () => {
    if (!token || !user || !checkAddress(token) || !checkAddress(user)) {
      setBalance('0.0');
    } else {
      call({
        address: token,
        abi: Erc20Abi,
        method: 'balanceOf',
        args: [user]
      }).then(setBalance(fromWeiToFixed(callResult, n ? n : 3)))
        .catch((error) => {
          console.log(error)
        })
    }
  }, [user, callResult, event]);

  return (
    balance
  );
}

export default useErc20BalanceOf;