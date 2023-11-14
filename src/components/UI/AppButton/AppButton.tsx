import React, {FC, MouseEventHandler} from 'react';
import styles from './AppButton.module.scss';

interface IAppButton {
    id?: string;
    width?: string;
    height?: string;
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    name?: string;
    className?: string;
    value: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    appStyle?: "standard" | "warning" | "white" | "transparent"
}


const AppButton: FC<IAppButton> = (props) => {

    let currentStyle;

    switch (props.appStyle) {
        case "warning": {currentStyle = styles.appButton__warning; break}
        case "white": {currentStyle = styles.appButton__white; break}
        case "transparent" : {currentStyle = styles.appButton__transparent; break}
        default: currentStyle = styles.appButton__standart;
    }

    return (
        <div>
            <button
                id={props.id}
                type={props.type}
                className={props.className ? props.className : `${styles.appButton} ${currentStyle}` }
                onClick={props.onClick}
                disabled={props.disabled}
                >
                {props.value}
            </button>
        </div>
    );
};

export default AppButton;