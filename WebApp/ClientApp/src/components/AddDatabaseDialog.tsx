import React, {ChangeEvent, ChangeEventHandler, useEffect, useRef, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {Col, Container, Form, Row} from "react-bootstrap";
import {DatabaseCredentials, DatabaseDto, DataBaseTypeEnum} from "../models/models.Dto";
import axios from "axios";

export interface AddDatabaseDialogProps {
    showDialog: boolean,
    connectDatabase: (database: DatabaseDto)=> void;
    handleDialogInteraction: () => void
}

export const AddDatabaseDialog: React.FunctionComponent<AddDatabaseDialogProps> =
    ({showDialog, connectDatabase, handleDialogInteraction}) => {

        const [databases, setDatabases] = useState<DatabaseDto[]>([]);
        const [uploadError, setUploadError] = useState("");
        const [databaseCredentials, setDatabaseCredentials] = useState<DatabaseCredentials>({
            databaseUrl: "",
            databaseType: DataBaseTypeEnum.firestore,
            filePath: ""
        })
        const inputFile = useRef<HTMLInputElement | null>(null);


        const onSelectFileClicked = () => {
            // `current` points to the mounted file input element
            inputFile.current?.click();
        };

        const onChangeFile = async (event: ChangeEvent<HTMLInputElement>)=> {
            event.stopPropagation();
            event.preventDefault();
            let files = event.target.files ?? []
            let file = files[0];
            console.log(files);
            if(file.type === 'application/json'){
                await uploadFile(files[0])
            }else{
                setUploadError("Invalid File type, File should be json");
            }
        }
        
        const uploadFile = async (file: File)=>{
            const formData = new FormData();
            formData.append('file', file)
            formData.append('databaseUrl',"-")
            formData.append('databaseType',  databaseCredentials.databaseType.toString())
            await axios.post('database', formData)
                .then(res => {
                    connectDatabase(res.data as DatabaseDto);
                }).catch(err => {
                    setUploadError(`Error Uploading file: ${err}`);
                });
        }

        const loadDatabaseData = async () => {
            const response = await fetch(`database`);
            const data = await response.json();
            setDatabases(data);
        }
        
        useEffect(() => {
            loadDatabaseData();
        }, [])
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
                                    <Form.Select value={databaseCredentials?.databaseType} onChange={(e) => {
                                        databaseCredentials.databaseType = parseInt(e.target.value)
                                        setDatabaseCredentials(databaseCredentials)
                                    }}>
                                        {Object.keys(DataBaseTypeEnum).map((type, i) => {
                                            return <option value={type} key={i}>{DataBaseTypeEnum[i]}</option>
                                        })}
                                    </Form.Select>
                                    <br/>
                                </Col>
                            </Row>

                            {databaseCredentials.databaseType === DataBaseTypeEnum.realtimeDb &&
                                <Row>
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
                                    }}
                                    onClick={onSelectFileClicked}>
                                        Drag and drop Credentetials file or Click to Browse files
                                    </div>
                                </Col>
                            </Row>
                            <input type='file' id='file' ref={inputFile} onChange={(e)=> onChangeFile(e)} style={{display: 'none'}}/>
                            {uploadError!== "" ? <div className='text-red-500 text-xs pb-2'>{uploadError}</div>: []}
                            <hr/>

                            {databases.map((db, i) => {
                                return (<Row
                                    key={i}
                                    style={{border: 'solid thin', padding: '10px', borderColor: 'gray'}}>
                                    <Col xs={10}>
                                        {db.databaseName}
                                    </Col>
                                    <Col xs={2}>
                                        <button className='bg-blue-500 rounded py-2 px-4' onClick={()=> connectDatabase(db)}>Connect</button>
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