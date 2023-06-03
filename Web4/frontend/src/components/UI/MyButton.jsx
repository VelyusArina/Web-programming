import React from 'react';
import { Button } from 'primereact/button';

const MyButton = props => {
    return (
        <Button className="my_button" {...props}>
            {props.children}
        </Button>
    );
};

export default MyButton;