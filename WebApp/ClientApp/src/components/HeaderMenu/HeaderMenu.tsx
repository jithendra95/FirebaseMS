import {Col, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import React from "react";

export interface  HeaderMenuProps{
    currentPath?: string
}
export const HeaderMenu: React.FunctionComponent<HeaderMenuProps> = ({currentPath}) => {
    return (
        <Row className='py-3'>
            <Col xs={2}>
                <Button variant="outline-primary">Preview Changes</Button>{' '}
                <Button variant="outline-primary">Commit</Button>{' '}
            </Col>
            <Col xs={10}>
                <div className='w-full bg-slate-400 rounded py-1 px-1'>
                    {currentPath}
                </div>
            </Col>
        </Row>
    )

}

