import './App.css';
import Web3Wrapper from './web3/wrapper/Web3Wrapper';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Home, Simulation, User } from './pages/index.js';
import Header from './components/root/Header';

const wrapperConfig = {
  infura: '09bab57197a241c0a3f998bb0d80691b',
  network: 42,
  rpc: 'https://kovan.infura.io/v3/09bab57197a241c0a3f998bb0d80691b',
  blockexplorer: {
    url: 'https://kovan.etherscan.io',
    name: 'etherscan'
  },
  biconomy: 'false',
}


function App() {
  return (
    <div className="App">
      <Web3Wrapper config={wrapperConfig}>
        <Router>

        <Header />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>

            <Route exact path='/user'>
              <User />
            </Route>

            <Route exact path='/test'>
              <Simulation />
            </Route>

          </Switch>
        </Router>
      </Web3Wrapper>
    </div>
  );
}

export default App;
