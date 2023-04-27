import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import {Context} from '../index';
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const {device} = useContext(Context);
    
    return (
        <Row className="d-flex">
            {device.devices.map((deviceItem) => 
                <DeviceItem
                    key={deviceItem.id}
                    device={deviceItem}
                    brandName={device.brands.find(brand => brand.id === deviceItem.brandId).name}
                />
            )}
        </Row>
    );
});

export default DeviceList;
 