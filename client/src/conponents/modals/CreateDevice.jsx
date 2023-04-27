import React, {useContext, useState, useEffect} from "react";
import { Button, Col, Dropdown, Form, FormControl, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { fetchBrands, fetchTypes, createDevice } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
  
    const {device} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, []);

    const [newDevice, setNewDevice] = useState({
        name: '',
        price: '',
        file: ''
    });

    const [info, setInfo] = useState([]);

    const selectFile = e => {
        setNewDevice({...newDevice, file: e.target.files[0]});
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]) 
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', newDevice.name);
        formData.append('price', newDevice.price);
        formData.append('img', newDevice.file);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info));

        createDevice(formData).then(data => onHide());
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
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown 
                        className="mt-3"    
                    >
                        <DropdownToggle>{device.selectedType.name || 'Выберите тип'}</DropdownToggle>
                        <DropdownMenu>
                            {device.types.map(type => 
                                <DropdownItem 
                                    key={type.id}
                                    onClick={() => device.setSelectedType(type)}    
                                >
                                    {type.name}
                                </DropdownItem>    
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className="mt-3">
                        <DropdownToggle>{device.selectedBrand.name || 'Выберите бренд'}</DropdownToggle>
                        <DropdownMenu>
                            {device.brands.map(brand => 
                                <DropdownItem 
                                    key={brand.id}
                                    onClick={() => device.setSelectedBrand(brand)}    
                                >
                                    {brand.name}
                                </DropdownItem>    
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <FormControl 
                        className="mt-3"
                        placeholder="Введите название устройства"
                        type="text"
                        value={newDevice.name}
                        onChange={e => setNewDevice({...newDevice, name: e.target.value})}
                    >
                    </FormControl>
                    <FormControl 
                        className="mt-3"
                        placeholder="Введите стоимость устройства "
                        type="number"
                        value={newDevice.price}
                        onChange={e => setNewDevice({...newDevice, price: String(e.target.value)})}
                    >
                    </FormControl>
                    <FormControl 
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    >
                    </FormControl>
                    <hr/>
                    <Button 
                        variant="outline-dark"
                        onClick={() => addInfo()}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i => 
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <FormControl
                                    value={i.title}
                                    onChange={e => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <FormControl
                                    value={i.description}
                                    onChange={e => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col xmd={4}>
                                <Button 
                                    variant="outline-danger"
                                    onClick={() => removeInfo(i.number)}    
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>   
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateDevice;
