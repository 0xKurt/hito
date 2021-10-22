import React, { createContext, useReducer } from "react";
import Reducer from './Reducer';

const initialState = {
    web3: '',
    provider: '',
    account: '',
    networkId: '',
    networkName: '',
    event: true,
};

const Web3Wrapper = (props) => {
    const [state, dispatch] = useReducer(Reducer, { ...initialState, ...props.config });
    return (
        <Context.Provider value={[state, dispatch]}>
            {props.children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Web3Wrapper;