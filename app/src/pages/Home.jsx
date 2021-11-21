import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useCallContract, useConnectedAccount, useEmptyWeb3, useErc20BalanceOf, useReadState, useWriteState } from '../web3/hooks';
import { LOGOGREY } from '../data/General';
import { HITO_ABI, HITO_CONTRACT_ADDRESS, HITO_TOKEN_ADDRESS, AAVE_ASSET, ERC20_ABI } from '../data/Chain';
import { fromWeiToFixed, toFixed2, usdcToHuman } from '../web3/utils/func';
import TransactionButton from '../web3/components/TransactionButton';
import Deposit from '../components/Deposit';


const Home = (BN) => {

  const history = useHistory();
  const web3 = useEmptyWeb3();
  const { account, } = useConnectedAccount();
  const { callResult, call } = useCallContract();
  const [totalInvests, setTotalInvests] = useState('loading ..')
  const [interest, setInterest] = useState('loading ..')
  const [aaveAssetBalance, setAaveAssetBal] = useState(0)
  const availRewToken = useErc20BalanceOf(HITO_TOKEN_ADDRESS, HITO_CONTRACT_ADDRESS, 3)
  const [lockedReward, setLockedReward] = useState(0);
  const [phase, setPhase] = useState('')
  const [owner, setOwner] = useState('')
  const hitoContract = new web3.eth.Contract(HITO_ABI, HITO_CONTRACT_ADDRESS)
  const aaveAsset = new web3.eth.Contract(ERC20_ABI, AAVE_ASSET)
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    let old = showModal;
    setShowModal(!old)
  }

  useEffect(async () => {
    setOwner(
      await hitoContract.methods.owner().call()
    )

    setLockedReward(
      fromWeiToFixed(await hitoContract.methods.getLockedRewards().call(), 3)
    )
    setAaveAssetBal(
      await aaveAsset.methods.balanceOf(HITO_CONTRACT_ADDRESS).call()
    )
    setTotalInvests(
      await hitoContract.methods.totalInvestments().call()
    )

    if (await hitoContract.methods.getIsFundingPhase().call()) {
      setPhase('funding')
    } else if (await hitoContract.methods.getIsMeilensteinPhase().call()) {
      setPhase('meilenstein')
    } else if (await hitoContract.methods.getIsRewardPhase().call()) {
      setPhase('reward')
    }
  })

  const onClickHandler = () => {
    history.push('/exchange')
  }
  return (
    <div className='home'>
      <Container fluid="sm" style={{ textAlign: "center", backgroundColor: '#efefef' }}>
        <br />
        <br />
        <Row>
          <Col style={{ fontWeight: "bold" }}>
            <h3>Hito PoC Funding Pot</h3>
          </Col>
        </Row>
        <br />
        <Row>
          <Col style={{ textAlign: "center" }}>
            <img src={LOGOGREY} className="mr-50 header-logo ml-30" />
          </Col>
        </Row>
        <Row>
          <Col style={{ fontWeight: "bold" }}>Description</Col>
        </Row>
        <br />
        <Row>

          <Col style={{ textAlign: "center" }}>
            This is the first PoC of Hito Funding.
            <br />
            <br />
            This is the proof that our idea works.
            <br />
            You can send funds to this PoC pot. Under "Simulation" you can make time go by faster, resulting in unlocking the funds for this demo.
            <br />
            <br />
            After time has moved on, the funds get unlocked again when the "claim"-Phase is reached.
            In the "claim"-phase, you can either take away your funds
            <br />
            - no risk, no loss -
            <br />
            or leave them in the pot for another round and earn the promised reward tokens.
          </Col>

        </Row>

        <br />
        <br />
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Phase
              </td>
              <td>
                {phase == 'funding' && <>Funding Phase</>}

                {phase == 'meilenstein' && <>Milestone Phase</>}

                {phase == 'reward' && <>Reward Phase</>}

                {phase == '' && <> loading..</>}
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Interact
              </td>
              <td>
                <Button onClick={toggleModal} disabled={!(phase == 'funding' && account)} style={{width: '220px'}}>
                  Fund
                </Button>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Invests Gesamt Anzahl:( Interest? )
              </td>
              <td>
                {usdcToHuman(aaveAssetBalance - totalInvests)}
              
              {owner == account &&<>
                <br /><center>
                  <TransactionButton
                    address={HITO_CONTRACT_ADDRESS}
                    abi={HITO_ABI}
                    method={'withdrawInterest'}
                    args={[0]}
                    confirmations={1}
                    text={'Withdraw'}
                  /></center>
                </>}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Invests Gesamt Betrag
              </td>
              <td>
                {usdcToHuman(totalInvests)}
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Zu vergebene Reward Token:
              </td>
              <td>
                {(availRewToken - lockedReward).toFixed(3)} / 20000000.000
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Reward Token Ratio
              </td>
              <td>
                Pro Investmentcoint 0.5 Reward Token
              </td>
            </tr>
          </tbody>
        </Table>
        <br />
        <br />
      </Container>
      {account && web3 && <Deposit show={showModal} toggleModal={toggleModal}/>}
    </div >
  );
}

export default Home;