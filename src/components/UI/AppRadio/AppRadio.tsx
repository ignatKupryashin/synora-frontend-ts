import styles from "./AppRadio.module.scss";
import {Dispatch, SetStateAction} from "react";

interface appRadioProps {
    id: string,
    parameter: string,
    setParameter: Dispatch<SetStateAction<any>>,
    data: {
        label: string,
        value: string
    }[];
}


const AppRadio = (props: appRadioProps) => {

    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        props.setParameter(e.currentTarget.value);
    }


    return (
        <div className={styles.appRadio}>
            {props.data.map((item) => (
                <div className={styles.appRadio__item} key={item.label}>
                    <label className={styles.appRadio__label}>{item.label}</label>
                <input
                    type="radio"
                    id={item.label}
                    name={props.id}
                    value={item.value}
                    checked={props.parameter === item.value}
                    onChange={(e) => changeHandler(e)}
                    className={styles.transfer__form_radio_input}
                />
                </div>
            ))}

        </div>
    );
};

export default AppRadio;