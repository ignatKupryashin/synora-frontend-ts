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
}

const AppButton: FC<IAppButton> = (props) => {

    return (
        <div>
            <button
                id={props.id}
                type={props.type}
                className={props.className ? props.className : styles.appButton}
                onClick={props.onClick}
                >
                {props.value}
            </button>
        </div>
    );
};

export default AppButton;