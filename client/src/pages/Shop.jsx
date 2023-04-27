import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../conponents/TypeBar";
import BrandBar from "../conponents/BrandBar";
import DeviceList from "../conponents/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import {fetchBrands, fetchDevices, fetchTypes} from '../http/deviceAPI';
import Pages from "../conponents/Pages";

const Shop = observer(() => {

    const {device} = useContext(Context);
    //при первом рендеринге получаем типы, бренды, товары
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices(null, null, 1, 2).then(data  => {
            //из поля rows ответа получаем массив устройств
            device.setDevices(data.rows);
            //из поля count ответа получаем количество встраниц всего
            device.setTotalCount(data.count);
        });
        }, []);

        useEffect(() => {
            fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2)
                .then(data => {
                    device.setDevices(data.rows);
                    device.setTotalCount(data.count);
                })
        }, [device.page, device.selectedType, device.selectedBrand]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;