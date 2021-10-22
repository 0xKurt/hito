import { useState } from 'react';
import Web3 from 'web3'
import { useReadState } from '..';

const useEmptyWeb3 = () => {
  const rpc = useReadState('rpc')
  const [web3, setWeb3] = useState(new Web3(rpc))
  return (
    web3
  );
}

export default useEmptyWeb3;