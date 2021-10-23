import './App.css';
import Web3Wrapper from './web3/wrapper/Web3Wrapper';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Home, CreatePot, BrowsePots, FAQ } from './pages/index.js';
import Header from './components/root/Header';

const wrapperConfig = {
  infura: 'b875684882204055bac61ec57a3ea1a1',
  portis: '7860cc95-2703-40f2-bf2b-04b4ac619dee',
  network: 4,
  rpc: 'https://rinkeby.infura.io/v3/b875684882204055bac61ec57a3ea1a1',
  blockexplorer: {
    url: 'https://rinkeby.etherscan.io',
    name: 'etherscan'
  },
  biconomy: 'false',
  biconomy_key: '<API KEY>'
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

            <Route exact path='/create'>
              <CreatePot />
            </Route>

            <Route exact path='/browse'>
              <BrowsePots />
            </Route>

            <Route exact path='/faq'>
              <FAQ />
            </Route>

          </Switch>
        </Router>
      </Web3Wrapper>
    </div>
  );
}

export default App;
