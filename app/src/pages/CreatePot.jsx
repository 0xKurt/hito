import React from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useConnectedWeb3, useReadState, useWriteState } from '../web3/hooks';

const CreatePot = () => {
  const history = useHistory();

  const onClickHandler = () => {
    history.push('/exchange')
  }
  return (
    <div className='body'>

      <Form>

        <Form.Group as={Row} className="mb-3" controllId="formPotName">
          <Form.Label column sm={2} >Pot name</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter pot name"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="exampleForm.ControlTextarea1">
          <Form.Label column sm={2} >Project Description</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={4} placeholder="Enter brief description of what your projects is doing" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formFile" >
          <Form.Label column sm={2} >Upload image</Form.Label>
          <Col sm={10}>
            <Form.Control type="file" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formNFTAddress">
          <Form.Label column sm={2} >NFT Address</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter Address of your NFT"></Form.Control>
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Pot
        </Button>
      </Form>

    </div>
  );
}

export default CreatePot;