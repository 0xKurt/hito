import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ASSET_ADDRESS, ERC20_ABI, HITO_ABI, HITO_CONTRACT_ADDRESS } from '../data/Chain';
import GeneralButton from '../web3/components/internal/GeneralButton';
import TransactionButton from '../web3/components/TransactionButton';
import { useConnectedAccount, useEmptyWeb3, useErc20BalanceOf } from '../web3/hooks';
import { maxINT, usdcToHuman } from '../web3/utils/func';


const Deposit = (props) => {
  const web3 = useEmptyWeb3();
  const { account, } = useConnectedAccount();
  const [assetBal, setAssetBal] = useState(0);
  const [amount, setAmount] = useState('')
  const assetContract = new web3.eth.Contract(ERC20_ABI, ASSET_ADDRESS)
  const [errorMessage, setErrorMessage] = useState('')
  const [allowance, setAllowance] = useState(0)
  // const { event, } = useTriggerEvent();

  useEffect(async () => {
    setAssetBal(await assetContract.methods.balanceOf(account).call())
    setAllowance(await assetContract.methods.allowance(account, HITO_CONTRACT_ADDRESS).call())
  })

  const onChangeHandler = (e) => {
    let newValue = e.target.value;

    if (newValue > 0.00) {
      setErrorMessage('')
      if (newValue * 100000 > assetBal) {
        setErrorMessage('insufficient balance');
      }
    } else {
      setErrorMessage('invalid amount');
    }
    if (newValue == '') setErrorMessage('')
    setAmount(newValue);
  }

  return (
    <Modal show={props.show} onHide={props.toggleModal}>
      <Modal.Header>
        <Modal.Title>Deposit USDC</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Available USDC: {usdcToHuman(assetBal)}
        </div>
        <div>
          <input placeholder='amount' inputmode="decimal" type='number' onChange={onChangeHandler} value={amount} />
          <div style={{ color: 'red' }}>
            {errorMessage}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.toggleModal}>
          Close
        </Button>
        <div className='mt-20'>
          {(allowance < amount * 1000000 || allowance == 0) &&
            <TransactionButton
              address={ASSET_ADDRESS}
              abi={ERC20_ABI}
              method={'approve'}
              args={[HITO_CONTRACT_ADDRESS, maxINT()]}
              confirmations={1}
              text={'Set Allowance'}
            />
          }
          {allowance >= amount * 1000000 && allowance > 0 && errorMessage == '' && amount != 0 &&
            <TransactionButton
              address={HITO_CONTRACT_ADDRESS}
              abi={HITO_ABI}
              method={'deposit'}
              args={[amount * 1000000]}
              confirmations={1}
              text={'Deposit'}
            />}
          {(!amount || errorMessage !== '') && allowance >= amount * 1000000 && allowance > 0 &&
            <GeneralButton
              onClick={() => { }}
              text={'Deposit'}
              color={props.colorInactive ? props.colorInactive : 'lightgrey'}
              backgroundColor={props.backgroundColorInactive ? props.backgroundColorInactive : '#f1f1f1'}
              caption={'invalid amount'}
            />
          }
        </div>

      </Modal.Footer>
    </Modal>
  );
}

export default Deposit;