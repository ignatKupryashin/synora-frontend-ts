import React, {ChangeEventHandler, FC} from 'react';
import styles from "./AppInput.module.scss"

interface IAppInput {
    id: string;
    label?: string;
    labelClassName? : string;
    width?: string;
    height?: string;
    type: React.HTMLInputTypeAttribute;
    name: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    maxLength?: number;
}



const AppInput: FC<IAppInput>= (props: IAppInput) => {
    return (
        <div className={styles.inputWrapper}>
            { props.label &&
            <label className={props.labelClassName ? props.labelClassName : styles.appLabel} htmlFor={props.id}>{props.label}</label>
            }
        <input
            id={props.id}
            width={props.width}
            height={props.height}
            type={props.type}
            name={props.name}
            value={props.value}
            defaultValue={(props.defaultValue)}
            placeholder={(props.placeholder ? props.placeholder : '')}
            onChange={(props.onChange ? props.onChange : undefined)}
            className={props.className ? props.className : styles.appInput}
            maxLength={props.maxLength}
        />

        </div>
    );
};

export default AppInput;