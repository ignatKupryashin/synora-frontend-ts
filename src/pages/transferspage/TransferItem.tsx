import React, {MouseEventHandler} from 'react';
import styles from "./TransferPage.module.scss";
import {ITransport} from "../../models/Transport/ITransport";
import deleteIcon from 'assets/svg/delete-icon.svg'

interface transferItemProps {
    transport: ITransport;
    onDelete: MouseEventHandler;
    onEdit?: MouseEventHandler;
}


const TransferItem = (props: transferItemProps) => {
    return (
        <div className={styles.transferItem}>
            <div className={styles.transferItem__wrapper}>
                <div className={styles.transferItem__title}>{props.transport.transport_name}</div>
                <div className={styles.transferItem__text}>
                    {props.transport.protocol_name}
                </div>
            </div>
            <button className={styles.transferItem__deleteButton} onClick={(e) => props.onDelete(e)}><img
                src={deleteIcon} alt='удалить'/></button>
        </div>
    );
};

export default TransferItem;