import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    const objBrands = {}
    device.brands.map(brand => {
        objBrands[brand.id] = brand.name
    })
    return (
        <Row className='d-flex'>
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device} brands={objBrands}/>
            )}
        </Row>
    );
});

export default DeviceList;