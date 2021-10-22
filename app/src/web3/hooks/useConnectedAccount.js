import useReadState from './internal/useReadState';
import useWriteState from './internal/useWriteState';

const useConnectedAccount = () => {
  const account = useReadState('account');
  const setAccount = useWriteState('SET_ACCOUNT');

  return ({
    account, 
    setAccount
  });
}

export default useConnectedAccount;