import React from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useConnectedWeb3, useReadState, useWriteState } from '../web3/hooks';

const BrowsePots = () => {
    const history = useHistory();

    const onClickHandler = () => {
        history.push('/exchange')
    }

    return (
        <div className='body'>
            <h2> Browse Projects </h2>
            <br/>
            <Container>
                <Row>
                    <Col sm={1}></Col>
                    <Col>
                        <Table striped bordered hover responsive="lg" >
                            <thead>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Description
                                    </th>
                                    <th>
                                        Active
                                    </th>
                                    <th>
                                        ETH Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Projekt 1</td>
                                    <td>Hier passieren Dinge</td>
                                    <td>Aktiv</td>
                                    <td>1.5 ETH</td>
                                </tr>
                                <tr>
                                    <td>Projekt 2</td>
                                    <td>Hier passieren Dinge</td>
                                    <td>Inaktiv</td>
                                    <td>2.3 ETH</td>
                                </tr>
                                <tr>
                                    <td>Projekt 3</td>
                                    <td>Hier passieren Dinge</td>
                                    <td>Aktiv</td>
                                    <td>0.75 ETH</td>
                                </tr>
                            </tbody>

                        </Table>
                    </Col>
                    <Col sm={1}></Col>
                </Row>
            </Container>



        </div>
    );
}

export default BrowsePots;