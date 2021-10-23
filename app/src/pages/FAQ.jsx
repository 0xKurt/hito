import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useConnectedWeb3, useReadState, useWriteState } from '../web3/hooks';

const FAQ = () => {
    const history = useHistory();

    const onClickHandler = () => {
        history.push('/exchange')
    }
    return (
        <div className='body'>
            <Container>
                <Row>
                    <Col></Col>
                <Col>Here will be a FAQ. </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}

export default FAQ;