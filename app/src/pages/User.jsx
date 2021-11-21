import React from 'react';
import { useEffect, useState } from "react";
import { Button, Card, Container, ListGroup, Row, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useConnectedWeb3, useConnectedAccount, useErc20BalanceOf, useReadState, useWriteState, useCallContract, useEmptyWeb3 } from '../web3/hooks';
import { ASSET_ADDRESS, ERC20_ABI, HITO_ABI, HITO_CONTRACT_ADDRESS, HITO_TOKEN_ADDRESS } from '../data/Chain'
import { fromWeiToFixed, usdcToHuman } from '../web3/utils/func';
import TransactionButton from '../web3/components/TransactionButton';
const User = () => {
    const history = useHistory();
    const web3 = useEmptyWeb3();
    const { account, } = useConnectedAccount();
    const [assetBal, setAssetBal] = useState(0)
    const hitoBal = useErc20BalanceOf(HITO_TOKEN_ADDRESS, account, 3)
    const [hitoUserBalContract, setHitoUserBalContract] = useState(0)
    const [invests, setInvests] = useState(0)
    const assetContract = new web3.eth.Contract(ERC20_ABI, ASSET_ADDRESS)
    const hitoContract = new web3.eth.Contract(HITO_ABI, HITO_CONTRACT_ADDRESS)
    const [isMeilensteinPhase, setIsMeilensteinPhase] = useState(false)
    const [phase, setPhase] = useState('')

    useEffect(async () => {
        if (account) {
            setAssetBal(await assetContract.methods.balanceOf(account).call())
            setHitoUserBalContract(await hitoContract.methods.getRewards(account).call())
            setInvests(await hitoContract.methods.investments(account).call())
        }
        if (await hitoContract.methods.getIsFundingPhase().call()) {
            setPhase('Funding phase: You will receive 0 HITO token.')
        } else if (await hitoContract.methods.getIsMeilensteinPhase().call()) {
            setIsMeilensteinPhase(true)
        } else if (await hitoContract.methods.getIsRewardPhase().call()) {
            setPhase(`Reward phase: You will receive ${fromWeiToFixed(hitoUserBalContract, 3)} HITO`)
        }
    })

    return (
        <div className='user'>
            <Container fluid="sm" style={{ backgroundColor: '#efefef' }}>
                <br />
                <br />
                <Row>
                    <Col style={{ fontWeight: "bold" }}>
                        <h3>User View</h3>
                    </Col>
                </Row>
                <br />
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Available Balance of Asset Token:
                            </td>
                            <td>
                                {usdcToHuman(assetBal)}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Balance of Invests:
                            </td>
                            <td>
                                {usdcToHuman(invests)}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Balance of Reward Token (Wallet):
                            </td>
                            <td>
                                {hitoBal}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Balance of Reward Token (Hito Contract):
                            </td>
                            <td>
                                {fromWeiToFixed(hitoUserBalContract, 3)}
                            </td>
                        </tr>
                        {invests > 0 && !isMeilensteinPhase && <tr>
                            <td style={{ fontWeight: "bold" }}>
                                <div>
                                    Withdraw Investment
                                </div>
                                {!isMeilensteinPhase &&
                                    <div>
                                        {phase}
                                    </div>
                                }
                            </td>
                            <td><center>
                                <TransactionButton
                                    address={HITO_CONTRACT_ADDRESS}
                                    abi={HITO_ABI}
                                    method={'withdraw'}
                                    args={[invests]}
                                    confirmations={1}
                                    text={'Withdraw'}
                                />
                            </center></td>
                        </tr>}
                    </tbody>
                </Table>
                <br />
                <br />
            </Container>
        </div>
    );
}

export default User;