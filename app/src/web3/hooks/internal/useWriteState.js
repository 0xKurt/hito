import React, { useContext, useEffect } from 'react';
import { Context } from '../../wrapper/Web3Wrapper';


const useWriteState = (t) => {
  const [state, dispatch] = useContext(Context);
  const type = t;

  const write = (payload) => {
    dispatch({ type, payload });
  }

  return (
    write
  );
}

export default useWriteState;