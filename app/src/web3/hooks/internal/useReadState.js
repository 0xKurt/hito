import React, { useContext, useEffect } from 'react';
import { Context } from '../../wrapper/Web3Wrapper';

const useReadState = (key) => {
  const [state, dispatch] = useContext(Context);

  return (
    state[key]
  );
}

export default useReadState;