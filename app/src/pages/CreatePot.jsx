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
      <br />
      <Container fluid="sm">
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

          <Form.Group as={Row} className="mb-3" controllId="formFundraisingPeriod">
            <Form.Label column sm={3} >Fundraising End</Form.Label>
            <Col sm={7}>
              <Form.Control type="time" placeholder="End of fundraising period"></Form.Control>
              <Form.Text className="text-muted">
                The duration of the fundraising period. After this, the fundraised amount will start earning interest. 
              </Form.Text>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controllId="formMilestoneDate1">
            <Form.Label column sm={3} >Milestone 1</Form.Label>
            <Col sm={7}>
              <Form.Control type="date" placeholder="End of interest earning period"></Form.Control>
              <Form.Text className="text-muted">
                The date of the milestone will allow when to withdraw funds or claim tokens.
              </Form.Text>
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3" controllId="formMilestoneDate2">
            <Form.Label column sm={3} >Milestone 2</Form.Label>
            <Col sm={7}>
              <Form.Control type="date" placeholder="End of interest earning period"></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controllId="formMilestoneDate3">
            <Form.Label column sm={3} >Milestone 3</Form.Label>
            <Col sm={7}>
              <Form.Control type="date" placeholder="End of interest earning period"></Form.Control>
            </Col>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Create
            </Button>
          </div>

        </Form>
      </Container>


    </div>
  );
}

export default CreatePot;