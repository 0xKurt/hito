import React from 'react';
import { Button, Card, Container, Row, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { ERC20_ABI, HITO_ABI, HITO_CONTRACT_ADDRESS, HITO_TOKEN_ADDRESS } from '../data/Chain';
import TransactionButton from '../web3/components/TransactionButton';
import { useConnectedWeb3, useReadState, useWriteState } from '../web3/hooks';
import { maxINT } from '../web3/utils/func';

const Simulation = () => {
    const history = useHistory();
    const { web3, } = useConnectedWeb3();

    const onClickHandler = () => {
        history.push('/exchange')
    }


    const deploy = async () => {

    }

    return (
        <div className='test'>
            <Container fluid="sm" style={{ backgroundColor: '#efefef' }}>
                <br />
                <br />
                <Row>
                    <Col style={{ fontWeight: "bold" }}>
                        <h3>Test und Simulation Dinge</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <p>
                            For testing purposes.
                        </p>
                    </Col>
                </Row>
                <br />
                <br />
                <Table striped bordered hover>
                    <tbody>
                        {/* <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Deploy Contract
                            </td>
                            <td>
                                <Button>Deploy</Button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Init Contract
                            </td>
                            <td>
                                <Button>Start </Button>
                            </td>
                        </tr> */}
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Funding Phase
                            </td>
                            <td>
                                <TransactionButton
                                    address={HITO_CONTRACT_ADDRESS}
                                    abi={HITO_ABI}
                                    method={'endFundingPhase'}
                                    args={[]}
                                    confirmations={1}
                                    text={'End'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Milestone Phase
                            </td>
                            <td>
                            <TransactionButton
                                    address={HITO_CONTRACT_ADDRESS}
                                    abi={HITO_ABI}
                                    method={'endMeilensteinPhase'}
                                    args={[]}
                                    confirmations={1}
                                    text={'End'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Emergency Withdraw Reward Token
                            </td>
                            <td>
                                <TransactionButton
                                    address={HITO_CONTRACT_ADDRESS}
                                    abi={HITO_ABI}
                                    method={'withdrawAllReward'}
                                    args={[]}
                                    confirmations={1}
                                    text={'Withdraw'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Set HITO allowance
                            </td>
                            <td>
                                <TransactionButton
                                    address={HITO_TOKEN_ADDRESS}
                                    abi={ERC20_ABI}
                                    method={'approve'}
                                    args={[HITO_CONTRACT_ADDRESS, maxINT()]}
                                    confirmations={1}
                                    text={'Approve'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Re-Init (you need 20M HITO and set allowance)
                            </td>
                            <td>
                                <TransactionButton
                                    address={HITO_CONTRACT_ADDRESS}
                                    abi={HITO_ABI}
                                    method={'init'}
                                    args={[]}
                                    confirmations={1}
                                    text={'Init'}
                                />
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

export default Simulation;