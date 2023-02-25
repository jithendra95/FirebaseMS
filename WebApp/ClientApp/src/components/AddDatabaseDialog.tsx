import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {Col, Container, Form, Row} from "react-bootstrap";
import {DatabaseDto} from "../models/models.Dto";

export interface AddDatabaseDialogProps {
    showDialog: boolean,
    handleDialogInteraction: () => void
}

export const AddDatabaseDialog: React.FunctionComponent<AddDatabaseDialogProps> =
    ({showDialog, handleDialogInteraction}) => {

        const [databases, setDatabases] = useState<DatabaseDto[]>([])
        const loadDatabaseData = async () => {
            const response = await fetch(`database`);
            const data = await response.json();
            setDatabases(data)
        }

        useEffect(() => {
            loadDatabaseData();
        }, [])
        const [database, setDatabase] = useState("firestore");
        return (
            <>
                <Modal size="lg" show={showDialog} centered onHide={handleDialogInteraction}>
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
                            <Row className='mb-3'>
                                <Col>
                                    <div style={{
                                        border: 'dotted thin',
                                        padding: '20px',
                                        borderColor: 'gray',
                                        cursor: 'pointer'
                                    }}>
                                        Drag and drop Credentetials file or Click to Browse files
                                    </div>
                                </Col>
                            </Row>

                            <hr/>

                            {databases.map((db, i) => {
                                return (<Row
                                    key={i}
                                    style={{border: 'solid thin', padding: '10px', borderColor: 'gray'}}>
                                    <Col xs={10}>
                                        {db.databaseName}
                                    </Col>
                                    <Col xs={2}>
                                        <button className='bg-sky-500 rounded py-2 px-4'>Connect</button>
                                    </Col>
                                </Row>)
                            })
                            }

                        </Container>

                    </Modal.Body>
                </Modal>
            </>
        );
    }