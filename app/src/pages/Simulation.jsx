import React from 'react';
import { Button, Card, Container, Row, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useConnectedWeb3, useReadState, useWriteState } from '../web3/hooks';

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
                                <Button>Start </Button>
                            </td>
                            <td>
                                <Button>End</Button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Milestone Phase
                            </td>
                            <td>
                                <Button>End</Button>
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