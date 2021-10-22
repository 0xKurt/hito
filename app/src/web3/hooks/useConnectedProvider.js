import useReadState from './internal/useReadState';
import useWriteState from './internal/useWriteState';

const useConnectedProvider = () => {
  const provider = useReadState('provider');
  const setProvider = useWriteState('SET_PROVIDER');

  return ({
    provider, 
    setProvider
  });
}

export default useConnectedProvider;