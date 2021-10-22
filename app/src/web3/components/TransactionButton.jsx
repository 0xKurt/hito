import React, { useEffect, useState } from 'react';
import { useConnectedAccount, useConnectedNetworkId, useConnectedProvider, useReadState, useSendTransaction } from '../hooks';
import GeneralButton from './internal/GeneralButton';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

const override = css`
  display: block;
  margin: 0 auto;
`;

const TransactionButton = (props) => {
  const { provider, } = useConnectedProvider();
  const { account, } = useConnectedAccount();
  const { networkId, } = useConnectedNetworkId();
  const network = useReadState('network')
  const blockexplorer = useReadState('blockexplorer')

  const send = useSendTransaction();
  const [text, setText] = useState(props.text);
  const [status, setStatus] = useState('')
  const [msg, setMsg] = useState(<>&nbsp;</>)

  const [onClickHandler, setOnClickHandler] = useState(() => {})
  const [color, setColor] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('')
  const [hoverColor, setHoverColor] = useState('')
  const [split, setSplit] = useState(false)
  const [icon, setIcon] = useState(<></>)

  const sendTx = () => {
    setMsg(props.language == 'de' ? 'Bitte Transaktion im Wallet bestätigen' : 'Waiting for wallet interaction');
    send({
      confirmations: props.confirmations,
      address: props.address,
      abi: props.abi,
      method: props.method,
      args: props.args
    }).on('transactionHash', hash => {
      setStatus('hash')
      setText(props.language == 'de' ? 'Senden...' : 'Pending...')
      let url = <a target='_blank' href={blockexplorer.url + '/tx/' + hash}>{blockexplorer.name}</a>
      setMsg(props.language == 'de' ? <>Transaktion auf {url} ansehen.</> : <>View transaction on ${url}</>)
    }).on('receipt', receipt => {
      console.log(receipt)
    }).on('confirmation', number => {
      setStatus('confirmed')
      setText(props.language == 'de' ? 'Erfolgreich!' : 'Confirmed!')
    }).on('error', error => {
      setText(props.language == 'de' ? 'Error!' : 'Failed!')
      setStatus('error')
      setMsg(props.language == 'de' ? 'Ein Fehler ist aufgetreten' : 'An error occured')
    })
  }

  const resetVars = () => {
    setText(props.text)
    setStatus('')
    setMsg(<>&nbsp;</>)
    setOnClickHandler(() => {})
    setColor('')
    setBackgroundColor('')
    setHoverColor('')
    setSplit(false)
    setIcon(<></>)
  }

  // const test = () => {
  //   console.log('helloooo')
  // }

  // useEffect(() => {
  //   console.log('jo')
  //   console.log('ist: '+networkId)
  //   console.log('soll: '+network)
  //   if(!account || (networkId != network)) {
  //     setOnClickHandler(()=>()=>{})
  //     setColor(props.colorInactive ? props.colorInactive : 'lightgrey')
  //     setBackgroundColor(props.backgroundColorInactive ? props.backgroundColorInactive : '#f1f1f1')
  //   }
  //   if(account && networkId == network && status == '') {
  //     console.log('da bims')
  //     setOnClickHandler(() => sendTx)
  //     setColor(props.color ? props.color : 'dodgerblue')
  //     setBackgroundColor(props.backgroundColor ? props.backgroundColor : 'white')
  //     setHoverColor(props.hoverColor ? props.hoverColor : '#fafafa')
  //   }

  // },[])

  // return (
  //   <div>
  //     <GeneralButton 
  //       onClick={onClickHandler}
  //       text={text}
  //       color={color}
  //       backgroundColor={backgroundColor}
  //       hoverColor={hoverColor}
  //       split={split}
  //       icon={icon}
  //     />
  //   </div>
  // )
  return (
    <div>
      {/* inactive, not logged in, wrong network */}
      {(!account || (networkId != network)) &&
        <GeneralButton
          onClick={() => { }}
          text={text}
          color={props.colorInactive ? props.colorInactive : 'lightgrey'}
          backgroundColor={props.backgroundColorInactive ? props.backgroundColorInactive : '#f1f1f1'}
          caption={msg}
        />}

        {/* Waiting for wallet interaction */}
      {account && networkId == network && status == '' &&
        <GeneralButton
          onClick={sendTx}
          text={text}
          color={props.color ? props.color : 'dodgerblue'}
          backgroundColor={props.backgroundColor ? props.backgroundColor : 'white'}
          hoverColor={props.hoverColor ? props.hoverColor : '#fafafa'}
          caption={msg}
        />}

        {/* Pending TX */}
      {account && networkId == network && status != '' && status != 'confirmed' && status != 'error' &&
        <GeneralButton
          onClick={() => { }}
          text={text}
          color={props.color ? props.color : 'dodgerblue'}
          backgroundColor={props.backgroundColor ? props.backgroundColor : 'white'}
          hoverColor={props.hoverColor ? props.hoverColor : '#1c82e6'}
          caption={msg}
          split={true}
          icon={<ClipLoader color={'#ffffff'} loading={true} css={override} size={18} />}
        />}

        {/* Confirmed TX */}
      {account && networkId == network && status != '' && status == 'confirmed' && status != 'error' &&
        <GeneralButton
          onClick={resetVars}
          text={text}
          color={props.colorConfirmed ? props.colorConfirmed : '#28a745'}
          backgroundColor={props.backgroundColorConfirmed ? props.backgroundColorConfirmed : 'white'}
          hoverColor={props.hoverColorConfirmed ? props.hoverColorConfirmed : '#24823a'}
          caption={msg}
          split={true}
          icon={<FaCheck />}
        />}

        {/* Failed TX */}
      {account && networkId == network && status != '' && status != 'confirmed' && status == 'error' &&
        <GeneralButton
          onClick={resetVars}
          text={text}
          color={props.colorFailed ? props.colorFailed : 'indianred'}
          backgroundColor={props.backgroundColorFailed ? props.backgroundColorFailed : 'white'}
          hoverColor={props.hoverFailed ? props.hoverFailed : '#b84040'}
          caption={msg}
          split={true}
          icon={<ImCross />}
        />}
    </div>
  );
}

export default TransactionButton;