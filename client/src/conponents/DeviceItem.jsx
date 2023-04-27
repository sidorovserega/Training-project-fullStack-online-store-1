import React from "react";
import { Col, Card, Image } from "react-bootstrap";
import star from '../assets/Vector.svg';
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils";

const DeviceItem = ({device, brandName}) => {
    
    const navigate = useNavigate();

    return (
        <Col md={3} className="mt-3" onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer', border: '1px solid PaleTurquoise'}}>
                {/* к названию файла добавляем еще URL сервера */}
                <Image width={150} heught={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 d-flex justify-content-between align-items-center">
                    <div>{brandName}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image src={star} width={15} height={15} alt={'Изображение звезды'}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
 