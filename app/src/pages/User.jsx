import React from 'react';
import { Button, Card, Container, ListGroup, Row, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useConnectedWeb3, useReadState, useWriteState } from '../web3/hooks';

const User = () => {
    const history = useHistory();

    const onClickHandler = () => {
        history.push('/exchange')
    }
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
                                12
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Balance of Invests:
                            </td>
                            <td>
                                12
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Balance of Reward Token:
                            </td>
                            <td>
                                12
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