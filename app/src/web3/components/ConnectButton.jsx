import React, { useEffect } from 'react';
import { useConnectedAccount, useConnectedNetworkId, useConnectedNetworkName, useConnectedProvider, useReadState } from '../hooks';
import useWeb3Modal from '../hooks/useWeb3Modal';
import { BsGrid } from 'react-icons/bs'
import { getChainName } from '../utils/networks';
import GeneralButton from './internal/GeneralButton';

// props:
//   colorConnect
//   backgroundColorConnect
//   hoverColorConnect

//   colorCorrect
//   backgroundColorCorrect
//   hoverColorCorrect

//   colorWrong
//   backgroundColorWrong
//   hoverColorWrong


const ConnectButton = (props) => {

  const { account, setAccount } = useConnectedAccount();
  const { networkId, setNetworkId } = useConnectedNetworkId();
  const { networkName, setNetworkName } = useConnectedNetworkName();
  const { provider, } = useConnectedProvider();
  const { connect, reconnect } = useWeb3Modal();
  const network = useReadState('network')

  useEffect(() => {
    console.log(provider)
    if (provider) {
      // Subscribe to accounts change
      provider.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        // trigger();
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        setNetworkId(parseInt(chainId))
        setNetworkName(getChainName(parseInt(chainId)))
        // trigger()
      });

      // Subscribe to provider connection
      provider.on("connect", (info) => {
        // console.log(info);
      });

      // Subscribe to provider disconnection
      provider.on("disconnect", (error) => {
        console.log(error);
      });
    }
  }, [provider])

  return (
    <div>
      {!account &&
        <GeneralButton
          onClick={connect}
          text={props.language == 'de' ? 'Verbinden' : 'Connect'}
          color={props.color ? props.colorConnect : 'dodgerblue'}
          backgroundColor={props.backgroundColorConnect ? props.backgroundColorConnect : 'white'}
          hoverColor={props.hoverColorConnect ? props.hoverColorConnect : '#fafafa'}
          caption={networkId != network && <><span>{props.language == 'de' ? 'Bitte verbinde dich mit ' : 'Please connect to '}</span><span style={{ marginLeft: '2px', fontWeight: '800', color: props.color ? props.colorConnect : 'dodgerblue' }}>{getChainName(network)}</span></>}
        />}
      {account && networkId == network &&
        <GeneralButton
          onClick={reconnect}
          text={account.toLowerCase().substring(0, 6) + ' ... ' + account.toLowerCase().substring(37,)}
          color={props.colorCorrect ? props.colorCorrect : '#28a745'}
          backgroundColor={props.backgroundColorCorrect ? props.backgroundColorCorrect : 'white'}
          hoverColor={props.hoverColorCorrect ? props.hoverColorCorrect : '#24823a'}
          caption={<><span style={{ color: props.colorCorrect ? props.colorCorrect : '#208738' }}>&#10004; </span> <span>{props.language == 'de' ? 'Verbunden mit ' : 'Connected with '}</span><span style={{ marginLeft: '2px', fontWeight: '800', color: props.colorCorrect ? props.colorCorrect : '#28a745' }}>{networkName}</span></>}
          split={true}
          icon={<BsGrid />}
          tooltip={props.language == 'de' ? 'Neu verbinden' : 'Reconnect'}
        />}
      {account && networkId != network &&
        <GeneralButton
          onClick={reconnect}
          text={account.toLowerCase().substring(0, 6) + ' ... ' + account.toLowerCase().substring(37,)}
          color={props.colorWrong ? props.colorWrong : 'indianred'}
          backgroundColor={props.backgroundColorWrong ? props.backgroundColorWrong : 'white'}
          hoverColor={props.hoverColorWrong ? props.hoverColorWrong : '#b84040'}
          caption={<><span style={{ color: props.colorWrong ? props.colorWrong : 'indianred' }}>&#10004; </span> <span>{props.language == 'de' ? 'Bitte verbinde dich mit ' : 'Please connect to '}</span><span style={{ marginLeft: '2px', fontWeight: '800', color: props.colorWrong ? props.colorWrong : 'indianred' }}>{getChainName(network)}</span></>}
          split={true}
          icon={<BsGrid />}
          tooltip={props.language == 'de' ? 'Neu verbinden' : 'Reconnect'}
        />}
    </div>
  );
}

export default ConnectButton;