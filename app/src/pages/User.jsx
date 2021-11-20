import React from 'react';
import { useEffect, useState } from "react";
import { Button, Card, Container, ListGroup, Row, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useConnectedWeb3, useConnectedAccount, useErc20BalanceOf, useReadState, useWriteState, useCallContract } from '../web3/hooks';
import { ASSET_ADDRESS, HITO_ABI, HITO_CONTRACT_ADDRESS, HITO_TOKEN_ADDRESS } from '../data/Chain'
import { fromWeiToFixed } from '../web3/utils/func';
const User = () => {
    const history = useHistory();
    const { web3, } = useConnectedWeb3();
    const { account, } = useConnectedAccount();
    const assetBal = useErc20BalanceOf(ASSET_ADDRESS, account, 10)
    const hitoBal = useErc20BalanceOf(HITO_TOKEN_ADDRESS, account, 3)
    const [hitoUserBalContract, setHitoUserBalContract] = useState(0)
    const { callResult, call } = useCallContract();
    const [invests, setInvests] = useState(0)

    const onClickHandler = () => {
        history.push('/exchange')
    }

    useState(async () => {
        if (account) {
            call({
                address: HITO_CONTRACT_ADDRESS,
                abi: HITO_ABI,
                method: 'getInvestments',
                args: [account]
            }).then(setInvests(fromWeiToFixed(callResult, 3)));
            call({
                address: HITO_CONTRACT_ADDRESS,
                abi: HITO_ABI,
                method: 'getRewards',
                args: [account]
            }).then(setHitoUserBalContract(fromWeiToFixed(callResult, 3)));
            
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
                                {(assetBal * 1000000000000).toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Balance of Invests:
                            </td>
                            <td>
                                {invests}
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
                                {hitoUserBalContract}
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

export default User;