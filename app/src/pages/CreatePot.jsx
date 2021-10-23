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

      <h2> Create Project </h2>
      <br/>
      <Form>

        <Form.Group as={Row} className="mb-3" controllId="formPotName">
          <Form.Label column sm={3} >Project name</Form.Label>
          <Col sm={7}>
            <Form.Control type="text" placeholder="Enter pot name"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="exampleForm.ControlTextarea1">
          <Form.Label column sm={3} >Project Description</Form.Label>
          <Col sm={7}>
            <Form.Control as="textarea" rows={4} placeholder="Enter brief description of what your projects is doing" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formFile" >
          <Form.Label column sm={3} >Upload image</Form.Label>
          <Col sm={7}>
            <Form.Control type="file" disabled />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formTokenAmount">
          <Form.Label column sm={3} >Amount of Distribution Token</Form.Label>
          <Col sm={7}>
            <Form.Control type="number" placeholder="Enter total amount of tokens to distribute to investors"></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formFundraisingEndDate">
          <Form.Label column sm={3} >Fundraising End</Form.Label>
          <Col sm={7}>
            <Form.Control type="date" placeholder="End of fundraising period"></Form.Control>
            <Form.Text className="text-muted">
              The end of the fundraising period marks the point in time when funds will start to earn interest. 
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controllId="formMilestoneDate">
          <Form.Label column sm={3} >Milestone</Form.Label>
          <Col sm={7}>
            <Form.Control type="date" placeholder="End of interest earning period"></Form.Control>
            <Form.Text className="text-muted">
              The date of the milestone will allow when to withdraw funds or claim tokens. 
            </Form.Text>
          </Col>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
            Create
          </Button>
        </div>

      </Form>

    </div>
  );
}

export default CreatePot;