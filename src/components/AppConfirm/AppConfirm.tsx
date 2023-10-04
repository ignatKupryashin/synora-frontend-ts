import React from 'react';
import styles from './AppConfirm.module.scss'

interface AppConfirmProps {
    question: string,
    onConfirm: () => void;
}


const AppConfirm = () => {
    return (
        <div className={styles.appConfirm}>
            <p className={styles.appConfirm__question}></p>
        </div>
    );
};

export default AppConfirm;