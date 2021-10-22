import React, { useEffect, useState } from 'react';
import { useEmptyWeb3, useTriggerEvent } from '.';
import { fromWeiToFixed, isAddress } from '../utils/func';

const useEthBalanceOf = (user, n) => {
  const [balance, setBalance] = useState('');
  const { event, } = useTriggerEvent();
  const web3 = useEmptyWeb3();

useEffect(() => {
  if(isAddress(user)) {
    web3.eth.getBalance(user).then(result => setBalance(fromWeiToFixed(result, n ? n : 3)))
  }
},[user, event])

  return (
    balance
  );
}

export default useEthBalanceOf;