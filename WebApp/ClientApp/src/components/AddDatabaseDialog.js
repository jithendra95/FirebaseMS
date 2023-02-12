import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Col, Container, Row, Form} from "react-bootstrap";

export function AddDatabaseDialog() {

    const [show, setShow] = useState(false);
    const [database, setDatabase] = useState("firestore");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal size="lg" show={show} centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Connect to Database</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col>
                                <Form.Select value={database} onChange={(e) => {
                                    setDatabase(e.target.value)
                                }}>
                                    <option value={'firestore'}>Firestore</option>
                                    <option value={'realtimeDb'}>Realtime Database</option>
                                </Form.Select>
                                <br/>
                            </Col>
                        </Row>

                        {database === 'realtimeDb' && <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    id="databaseUrl"
                                    placeholder={"Database URL"}
                                />
                                <br/>
                            </Col>
                        </Row>}
                        <Row>
                            <Col>
                               <div style={{border: 'dotted thin', padding: '20px', borderColor: 'gray', cursor: 'pointer'}}>
                                   Drag and drop Credentetials file or Click to Browse files
                               </div>
                            </Col>
                        </Row>

                        <hr/>

                        <Row style={{border: 'solid thin', padding: '10px', borderColor: 'gray'}}>
                            <Col xs={10}>
                                Database Name
                            </Col>
                            <Col>
                                <Button variant="primary">Connect</Button>{' '}
                            </Col>
                        </Row>
                        
                    </Container>
                    
                </Modal.Body>
            </Modal>
        </>
    );
}