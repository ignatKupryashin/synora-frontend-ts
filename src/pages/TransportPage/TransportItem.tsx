import React, {MouseEventHandler} from 'react';
import styles from "./TransportPage.module.scss";
import {ITransport} from "../../models/Transport/ITransport";
import DeleteButton from "../../components/UI/FunctionalButtons/DeleteButton/DeleteButton";

interface transferItemProps {
    transport: ITransport;
    onDelete: MouseEventHandler;
    onEdit?: MouseEventHandler;
}


const TransportItem = (props: transferItemProps) => {
    return (
        <div className={styles.transferItem}>
            <div className={styles.transferItem__wrapper}>
                <div className={styles.transferItem__title}>{props.transport.transport_name}</div>
                <div className={styles.transferItem__text}>
                    {props.transport.protocol_name}
                </div>
            </div>
            <DeleteButton onDelete={props.onDelete}/>
        </div>
    );
};

export default TransportItem;