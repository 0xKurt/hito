import useReadState from './internal/useReadState';
import useWriteState from './internal/useWriteState';

const useConnectedNetworkName = () => {
  const networkName = useReadState('networkName');
  const setNetworkName = useWriteState('SET_NETWORKNAME');

  return ({
    networkName, 
    setNetworkName
  });
}

export default useConnectedNetworkName;