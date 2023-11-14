import React from 'react';
import styles from "./TranslucentWrapper.module.scss"

interface TranslucentWrapperProps extends React.PropsWithChildren{
    children: React.ReactNode
}


const TranslucentWrapper = (props:TranslucentWrapperProps) => {
    return (
        <div className={styles.translucentWrapper}>
            {props.children}
        </div>
    );
};

export default TranslucentWrapper;