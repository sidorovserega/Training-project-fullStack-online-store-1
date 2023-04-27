import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateType from "../conponents/modals/CreateType";
import CreateBrand from "../conponents/modals/CreateBrand";
import CreateDevice from "../conponents/modals/CreateDevice";

const Admin = () => {

    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <Container className="d-flex flex-column">
            <Button 
                variant={'outline-dark'} 
                className="m-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button 
                variant={'outline-dark'} 
                className="m-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button 
                variant={'outline-dark'} 
                className="m-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>
    );
}

export default Admin;