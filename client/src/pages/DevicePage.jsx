import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Button, Card } from "react-bootstrap";
import star from '../assets/Vector.svg';
import { useParams } from "react-router-dom";
import {fetchOneDevice} from '../http/deviceAPI';

//Временная заглушка для получения данных
const DevicePage = () => {
    const [device, setDevice] = useState({info: []});
    //для получения id устройства
    const {id} = useParams();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, []);

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image src={process.env.REACT_APP_API_URL + device.img} width={"240px"} height={"240px"}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 style={{textAlign: 'center'}}>{device.name}</h2>
                        <div 
                            className="d-flex justify-content-center align-items-center"
                            style={{background: `url(${star}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 30}}
                        >
                                {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card 
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}    
                    >
                        <h3>{device.price}</h3>
                        <Button>Добавить в корзину</Button>
                    </Card>
                    
                </Col>
            </Row>
            <Row>
                <h1>Характеристики</h1>
                {device.info.map((info, index) => 
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}:{info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
}

export default DevicePage;