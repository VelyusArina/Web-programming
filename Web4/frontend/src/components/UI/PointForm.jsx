import React from 'react';
import MyButton from "./MyButton";
import {InputNumber} from "primereact/inputnumber";
import styles from "./PointForm.module.css";
import {RadioButton} from "primereact/radiobutton";
import {Text} from "react-native";

const PointForm = ({setInputR, setInputX, setInputY, inputR, inputX, inputY, submit, clear}) => {
    const changeInput = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case "R":
                setInputR(parseFloat(e.target.value));
                break;
            case "X":
                setInputX(parseFloat(e.target.value));
                break;
            case "Y":
                setInputY(parseFloat(e.target.value));
                break;
            default:
                break;
        }
    }

    return (
        <form>
            <div className={styles.form__wrapper}>
                <div className={styles.form_input__wrapper}>
                    <div className={styles.form_input_name}>
                        <span>R:</span>
                    </div>
                    <div className={styles.form_input_buttons__wrapper}>
                        {[-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2.0].map((v) => {
                            return (
                                <div key={v} className="form_input_radio">
                                    <RadioButton onChange={changeInput} name="R" value={v} checked={inputR === v}/>
                                    <Text htmlFor={v} className="ml-5">{v}</Text>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.form_input__wrapper}>
                    <div className={styles.form_input_name}>
                        <span>X:</span>
                    </div>
                    <div className={styles.form_input_buttons__wrapper}>
                        {[-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2.0].map((v) => {
                            return (
                                <div key={v} className="form_input_radio">
                                    <RadioButton onChange={changeInput} name="X" value={v} checked={inputX === v}/>
                                    <Text htmlFor={v} className="ml-5">{v}</Text>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.form_input__wrapper}>
                    <div className={styles.form_input_name}>
                        <span>Y:</span>
                    </div>
                    <div className={styles.form_input_buttons__wrapper}>
                        <InputNumber
                            value={inputY}
                            onValueChange={(e) => setInputY(e.value)}
                            mode="decimal"
                            showButtons
                            maxFractionDigits={5}
                            min={-3}
                            max={3}
                        />
                    </div>
                </div>
                <div className={styles.form_input_submit__wrapper}>
                    <MyButton size="large" raised severity="success" onClick={submit}>Submit</MyButton>
                    <MyButton size="large" raised severity="warning" icon="pi pi-trash" onClick={clear}>Clear
                        All</MyButton>
                </div>
            </div>
        </form>
    );
};

export default PointForm;