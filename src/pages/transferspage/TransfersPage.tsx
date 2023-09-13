import React from 'react';
import styles from "./TransferPage.module.scss"
import {Link} from "react-router-dom";
import {ITransport} from "../../models/Transport/ITransport";
import {useTransportStore} from "../../store/transportStore/useTransportStore";
import TransferItem from "./TransferItem";


const TransfersPage = () => {
    const transportList: ITransport[] = useTransportStore(state => state.transports);
    const deleteTransport = useTransportStore(state => state.deleteTransport)
    const removeTransport = useTransportStore(state => state.removeTransport)

    const deleteTransportHandler = (transport: ITransport) => {
        try {
            deleteTransport(transport).then((response) => {
                    if (response) {
                        removeTransport(transport.id);
                    }
                }
            )
        } catch (e) {
            console.log((e as Error).message);
        }
    }

    return (
        <div className={styles.transfers}>
            <h1 className={styles.transfers__title}>Транспорты</h1>
            <div className={styles.transfers__btn}>
                <Link to='/transfers/new_transfer' className={styles.transfers__btn_link}>Создать транспорт</Link>
            </div>
            <div className={styles.transfers__list}>
                {
                    transportList.length > 0
                        ? transportList.map(transport => (
                            <TransferItem key={transport.id} transport={transport} onDelete={(e) => deleteTransportHandler(transport)}/>
                        ))
                        : <div className={styles.transfers__item_text}>Пока что у Вас нет созданных шаблонов</div>
                }
            </div>
        </div>
    )
};

export default TransfersPage;