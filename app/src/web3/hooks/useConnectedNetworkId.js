import useReadState from './internal/useReadState';
import useWriteState from './internal/useWriteState';

const useConnectedNetworkId = () => {
  const networkId = useReadState('networkId');
  const setNetworkId = useWriteState('SET_NETWORKID');

  return ({
    networkId, 
    setNetworkId
  });
}

export default useConnectedNetworkId;