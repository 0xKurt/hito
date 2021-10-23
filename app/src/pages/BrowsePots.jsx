import React from 'react';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useConnectedWeb3, useReadState, useWriteState } from '../web3/hooks';

const BrowsePots = () => {
    const history = useHistory();

    const onClickHandler = () => {
        history.push('/exchange')
    }
    return (
        <div className='body'>

            <Table striped bordered hover >
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Projekt 1</td>
                        <td>Hier passieren Dinge</td>
                        <td>Aktiv</td>
                    </tr>
                    <tr>
                        <td>Projekt 2</td>
                        <td>Hier passieren Dinge</td>
                        <td>Inaktiv</td>
                    </tr>
                    <tr>
                        <td>Projekt 3</td>
                        <td>Hier passieren Dinge</td>
                        <td>Aktiv</td>
                    </tr>
                </tbody>

            </Table>
        </div>
    );
}

export default BrowsePots;