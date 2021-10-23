import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const PotDetail = () => {
    return (
        <div className='potDetail'>

            <br/>
            <br/>

            <Container fluid="sm">
                <Row>
                    <Col style={{ fontWeight: "bold" }}>
                        <h3>Very cool project name</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col style={{ fontWeight: "bold" }}>Description</Col>
                </Row>
                <br />
                <Row>
                    <Col sm={1}></Col>

                    <Col style={{ textAlign: "left" }}>
                        Lorem ipsum blarum text geht hier weiter weiß ich auch nicht wo der herkommt bla was passiert wenn der Text ganz lang wird sieht man dann oje ogott achja so is tdas
                    </Col>

                    <Col sm={1}></Col>

                </Row>
                <br />
                <Row>
                    <Col style={{ fontWeight: "bold" }}>Token Distribution</Col>
                    <Col style={{ textAlign: "left" }}>
                        10.000 Token
                    </Col>
                </Row>

                <br />
                <Row>
                    <Col style={{ fontWeight: "bold" }}>Fundraising End</Col>
                    <Col style={{ textAlign: "left" }}>31.10.2021</Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={10}>
                        <Button>
                            Fund
                        </Button>
                    </Col>
                </Row>


                <br />
                <Row>
                    <Col style={{ fontWeight: "bold" }}>Milestone 1 End</Col>
                    <Col style={{ textAlign: "left" }}>
                        31.12.2021
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={10}>
                        <Button>
                            Claim
                        </Button>
                    </Col>
                </Row>

                <br />
                <Row>
                    <Col style={{ fontWeight: "bold" }}>Milestone 2 End</Col>
                    <Col style={{ textAlign: "left" }}>
                        31.12.2021
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={10}>
                        <Button disabled>
                            Claim
                        </Button>
                    </Col>
                </Row>

                <br />
                <Row>
                    <Col style={{ fontWeight: "bold" }}>Milestone 3 End</Col>
                    <Col style={{ textAlign: "left" }}>
                        31.12.2021
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={10}>
                        <Button disabled>
                            Claim
                        </Button>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default PotDetail;