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

        <Form.Group as={Row} className="mb-3" controllId="formIDRange">
          <Form.Label column sm={2} >NFT ID's to sell</Form.Label>
          <Col sm={5}>
            <Form.Control type="number" placeholder="From first ID..."></Form.Control>
          </Col>
          <Col sm={5}>
            <Form.Control type="number" placeholder="...to last ID"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formMaxUserBuy">
          <Form.Label column sm={2} >Max Amount User can buy</Form.Label>
          <Col sm={10}>
            <Form.Control type="number" placeholder="Amount"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formNFTPrice">
          <Form.Label column sm={2} >Price per NFT</Form.Label>
          <Col sm={10}>
            <Form.Control type="number" placeholder="Price of NFT"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formSaleStart">
          <Form.Label column sm={2} >Sale Start Date</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" placeholder="Sale Start"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formVoteStart">
          <Form.Label column sm={2} >Vote Start Date</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" placeholder="Vote Start"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formVoteStart">
          <Form.Label column sm={2} >Vote Start Date</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" placeholder="Vote Start"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formMilestone1">
          <Form.Label column sm={2} >Milestone 1</Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Milestone name"></Form.Control>
          </Col>
          <Col sm={3}>
            <Form.Control type="textarea" placeholder="Brief description"></Form.Control>
          </Col>
          <Col sm={2}>
            <Form.Control type="decimal" placeholder="ETH"></Form.Control>
          </Col>
          <Col sm={2}>
            <Form.Control type="date" placeholder="reached"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formMilestone2">
          <Form.Label column sm={2} >Milestone 2</Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Milestone name"></Form.Control>
          </Col>
          <Col sm={3}>
            <Form.Control type="textarea" placeholder="Brief description"></Form.Control>
          </Col>
          <Col sm={2}>
            <Form.Control type="decimal" placeholder="ETH"></Form.Control>
          </Col>
          <Col sm={2}>
            <Form.Control type="date" placeholder="reached"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formMilestone3">
          <Form.Label column sm={2} >Milestone 3</Form.Label>
          <Col sm={3}>
            <Form.Control type="text" placeholder="Milestone name"></Form.Control>
          </Col>
          <Col sm={3}>
            <Form.Control type="textarea" placeholder="Brief description"></Form.Control>
          </Col>
          <Col sm={2}>
            <Form.Control type="decimal" placeholder="ETH"></Form.Control>
          </Col>
          <Col sm={2}>
            <Form.Control type="date" placeholder="reached"></Form.Control>
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" size="lg">
          Create Pot
        </Button>

      </Form>

    </div>
  );
}

export default CreatePot;