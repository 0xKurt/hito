import useReadState from './internal/useReadState';
import useWriteState from './internal/useWriteState';

const useConnectedWeb3 = () => {
  const web3 = useReadState('web3');
  const setWeb3 = useWriteState('SET_WEB3');

  return ({
    web3, 
    setWeb3
  });
}

export default useConnectedWeb3;