const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEB3':
      return {
        ...state,
        web3: action.payload
      };
    case 'SET_PROVIDER':
      return {
        ...state,
        provider: action.payload
      };
    case 'SET_ACCOUNT':
      return {
        ...state,
        account: action.payload
      };
    case 'SET_NETWORKID':
      return {
        ...state,
        networkId: action.payload
      };
    case 'SET_NETWORKNAME':
      return {
        ...state,
        networkName: action.payload
      };
    case 'TOGGLE_EVENT':
      let old = state.event;
      return {
        ...state,
        event: !old
      };
    default:
      return state;
  }
};

export default Reducer;