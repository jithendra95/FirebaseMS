import {Col, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import React from "react";


export const TableOptions: React.FunctionComponent = () => {
    return (
        <Row className='pb-2'>
            <Col xs={12}>
                <Button variant="outline-primary">Add New Record</Button>{' '}
                <Button variant="outline-primary">Filter</Button>{' '}
                <Button variant="outline-primary">Columns</Button>{' '}
                
            </Col>
        </Row>
    )

}

