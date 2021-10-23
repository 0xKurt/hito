import React from 'react';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useConnectedWeb3, useReadState, useWriteState } from '../web3/hooks';

const BrowsePots = () => {
  const history = useHistory();

  const onClickHandler = () => {
    history.push('/exchange')
  }
  return (
    <div className='body'>
      Here you will be able to see all the existing pots. 
    </div>
  );
}

export default BrowsePots;