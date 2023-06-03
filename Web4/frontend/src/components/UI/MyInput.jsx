import React from 'react';
import {InputText} from "primereact/inputtext";

const MyInput = props => {
    return (
        <InputText {...props}>
            {props.children}
        </InputText>
    );
};

export default MyInput;