import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useCallContract, useConnectedWeb3, useErc20BalanceOf, useReadState, useWriteState } from '../web3/hooks';
import { LOGOGREY } from '../data/General';
import { HITO_ABI, HITO_CONTRACT_ADDRESS, HITO_TOKEN_ADDRESS, AAVE_ASSET } from '../data/Chain';
import { fromWeiToFixed } from '../web3/utils/func';

const Home = () => {
  const history = useHistory();
  const { callResult, call } = useCallContract();
  const [totalInvests, setTotalInvests] = useState('loading ..')
  const [interest, setInterest] = useState('loading ..')
  const availRewToken = useErc20BalanceOf(HITO_TOKEN_ADDRESS, HITO_CONTRACT_ADDRESS, 3)
  const aaveAssetBalance = useErc20BalanceOf(AAVE_ASSET, HITO_CONTRACT_ADDRESS, 3)
  const [phase, setPhase] = useState('')

  useEffect(async () => {
    await call({
      address: HITO_CONTRACT_ADDRESS,
      abi: HITO_ABI,
      method: 'totalInvestments',
      args: []
    }).then(setTotalInvests(fromWeiToFixed(callResult, 3)));

    await call({
      address: HITO_CONTRACT_ADDRESS,
      abi: HITO_ABI,
      method: 'getIsFundingPhase',
      args: []
    }).then(() => {
      console.log('1: '+ callResult)
      if (callResult == true)
        setPhase('funding')
    });

    await call({
      address: HITO_CONTRACT_ADDRESS,
      abi: HITO_ABI,
      method: 'getIsMeilensteinPhase',
      args: []
    }).then(() => {
      console.log('2: '+callResult)
      if (callResult == true)
        setPhase('meilenstein')
    });

    await call({
      address: HITO_CONTRACT_ADDRESS,
      abi: HITO_ABI,
      method: 'getIsRewardPhase',
      args: []
    }).then(() => {
      console.log('3: '+callResult)
      if (callResult == true)
        setPhase('reward')
    });

  }, [phase])

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
              <Button>
                Fund / Claim
              </Button>
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>
              Invests Gesamt Anzahl:( Interest? )
            </td>
            <td>
              {aaveAssetBalance - totalInvests}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>
              Invests Gesamt Betrag
            </td>
            <td>
              {totalInvests}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>
              Zu vergebene Reward Token:
            </td>
            <td>
              {availRewToken} / 200000.000
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
    </div >
  );
}

export default Home;