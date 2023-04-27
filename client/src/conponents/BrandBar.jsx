import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import {Context} from '../index';
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context);
    
    return (
        <Row style={{display: 'flex'}}>
            {device.brands.map((brand) => 
                <Card 
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id} 
                    className="p-3"
                    style={{cursor: 'pointer'}}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
 