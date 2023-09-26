import React, {ChangeEventHandler} from 'react';
import styles from "./AppTextArea.module.scss";

interface IAppTextArea {
    id: string;
    label?: string;
    name: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    className?: string;
    maxLength?: number;
}

const AppTextArea = (props: IAppTextArea) => {
    return (
        <div className={styles.textAreaWrapper}>
            {props.label && <label htmlFor={props.id} className={styles.appLabel}>{props.label}</label>}
            <textarea
                id={props.id}
                name={props.name}
                value={props.value}
                defaultValue={(props.defaultValue)}
                placeholder={(props.placeholder ? props.placeholder : '')}
                onChange={(props.onChange ? props.onChange : undefined)}
                className={props.className ? props.className : styles.appTextArea}
                maxLength={props.maxLength}
            />
        </div>
    );
};

export default AppTextArea;