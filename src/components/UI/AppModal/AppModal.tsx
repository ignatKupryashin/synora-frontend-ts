import React, {FC, ReactNode} from 'react';
import styles from './AppModal.module.scss';

type AppModalProps = {
    visible: boolean;
    setVisible(visible: boolean): void;
    children: ReactNode;
}



const AppModal: FC<AppModalProps> = (props) => {

    const closeHandler = ()=> {
        props.setVisible(false);
    }

    return (
        <div className={
            props.visible
                ?
                `${styles.appModal__wrapper} ${styles.appModal__closed}`
                :
                styles.appModal__wrapper}
             onClick={() => closeHandler()}>
            <div onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

export default AppModal;