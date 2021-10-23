import React from 'react';
import { Button, Container, Row, Col, Image, ProgressBar, Table, Form } from 'react-bootstrap';
import Heart from '../data/img/heart.jpg';

const PotDetail = () => {
    return (
        <div className='potDetail'>

            <Container fluid="sm">
                <Row>
                    <Col sm={5}>
                        <Image src={Heart} rounded />
                    </Col>
                    <Col sm={5}>
                        <h3>Very cool project name</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={5} style={{ fontWeight: "bold" }}>Description</Col>
                </Row>
                <br />
                <Row>
                    <Col sm={2}></Col>
                    <Col sm={7} style={{ textAlign: "left" }}>
                        Lorem ipsum blarum text geht hier weiter wqeiß ich auch nicht wo der herkommt bla was passiert wenn der Text ganz lang wird sieht man dann oje ogott achja so is tdas
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={5} style={{ fontWeight: "bold" }}>Milestones</Col>
                </Row>
                <br />
                <Row>
                    <Col sm={2}></Col>
                    <Col sm={7}>

                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        Milestone Nr.
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Due in
                                    </th>
                                    <th>
                                        ETH Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#1</td>
                                    <td>Building a Website</td>
                                    <td>10 min</td>
                                    <td>0.005 ETH</td>
                                </tr>
                                <tr>
                                    <td>#2</td>
                                    <td>Releasing a Shitcoin</td>
                                    <td>240 min</td>
                                    <td>0.05 ETH</td>
                                </tr>
                                <tr>
                                    <td>#3</td>
                                    <td>Work the magic</td>
                                    <td>4000 min</td>
                                    <td>0.5 ETH</td>
                                </tr>
                            </tbody>
                        </Table>

                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={5} style={{ fontWeight: "bold" }}>Buy</Col>
                </Row>
                <br />
                <Form>
                    <Row className="align-items-center">
                        <Col sm={3}></Col>
                        <Col sm={4}>
                            <Form.Group className="mb-3" controlId="formBuyAmount">
                                <Form.Control type="decimal" placeholder="Amount to buy" />
                            </Form.Group>

                        </Col>
                        <Col sm={2}>
                            <Button variant="primary" type="submit" size="lg">
                                Buy
                            </Button>
                        </Col>

                    </Row>
                </Form>
                <br />
                <Row>
                    <Col sm={5} style={{ fontWeight: "bold" }}>Stats</Col>
                </Row>
                <br />
                <Row>
                    <Col sm={2}></Col>
                    <Col>
                        <ProgressBar now={60} />
                    </Col>
                    <Col>
                        x / y NFT's verkauft
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={2}></Col>
                    <Col>
                        <ProgressBar now={25} />
                    </Col>
                    <Col>
                        x / y ETH funded
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default PotDetail;