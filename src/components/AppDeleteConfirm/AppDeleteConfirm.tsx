import React, {FC, ReactNode} from 'react';
import styles from "./AppDeleteConfirm.module.scss"
import AppButton from "../UI/AppButton/AppButton";
import AppModal from "../UI/AppModal/AppModal";

interface AppConfirmProps {
    question: ReactNode,
    isVisible: boolean;
    setIsVisible(visible: boolean): void;
    onConfirm?: () => void;
}




const AppDeleteConfirm: FC<AppConfirmProps> = (props) => {

    // const applyHandler = () => {
    //     props.onConfirm();
    //     props.setIsVisible(false);
    // }


    return (
        <AppModal visible={props.isVisible} setVisible={props.setIsVisible} children={
            <div className={styles.appDeleteConfirm}>
                {props.question}
                <div className={styles.appDeleteConfirm__buttonBlock}>
                    <AppButton className={styles.appDeleteConfirm__declineButton} type={'button'} value={'Отменить'} onClick={() => props.setIsVisible(false)}/>
                    <AppButton className={styles.appDeleteConfirm__applyButton} type={'button'} value={'Удалить'} onClick={
                        () => {
                            props.onConfirm && props.onConfirm();
                            props.setIsVisible(false);
                        }
                    }/>
                </div>
            </div>
        }
        />
    );
};

export default AppDeleteConfirm;