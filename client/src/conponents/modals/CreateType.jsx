import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {createType} from '../../http/deviceAPI';

const CreateType = ({show, onHide}) => {
  
    const [valueType, setValueType] = useState('');
    
    const addType = () => {
        //если отправка запроса прошла, valueTRype обнуляем
        createType({name: valueType}).then(data => { 
            setValueType('')
            onHide();
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        placeholder={'Введите название типа'}
                        value={valueType}
                        onChange={(e) => setValueType(e.target.value)}    
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => addType()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateType;
