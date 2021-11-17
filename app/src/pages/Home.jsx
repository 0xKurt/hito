import React from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useConnectedWeb3, useReadState, useWriteState } from '../web3/hooks';
import { LOGOGREY } from '../data/General';

const Home = () => {
  const history = useHistory();

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
                Funding Phase
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
                Invests Gesamt Anzahl:
              </td>
              <td>
                12
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Invests Gesamt Betrag
              </td>
              <td>
                12 Million :>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Zu vergebene Reward Token:
              </td>
              <td>
                ganz viele!
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Reward Token Ratio
              </td>
              <td>
                Pro Investmentcoint 12 Reward Token
              </td>
            </tr>
          </tbody>
        </Table>
        <br />
        <br />
      </Container>
    </div>
  );
}

export default Home;