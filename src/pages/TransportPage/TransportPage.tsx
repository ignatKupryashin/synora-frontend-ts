import React, {ReactNode, useState} from 'react';
import styles from "./TransportPage.module.scss"
import {useNavigate} from "react-router-dom";
import {ITransport} from "../../models/Transport/ITransport";
import {useTransportStore} from "../../store/transportStore/useTransportStore";
import TransportItem from "./TransportItem";
import {successful, unsuccessful} from "../../components/UI/Toast/Toast";
import AppButton from "../../components/UI/AppButton/AppButton";
import StandardFade from "../../components/Animations/StandardFade";
import AppDeleteConfirm from "../../components/AppDeleteConfirm/AppDeleteConfirm";


const TransportPage = () => {
    const transportList: ITransport[] = useTransportStore(state => state.transports);
    const deleteTransport = useTransportStore(state => state.deleteTransport)
    const removeTransport = useTransportStore(state => state.removeTransport)
    const [deleteIsVisible, setDeleteIsVisible] = useState(false);
    const [deleteTransportState, setDeleteTransportState] = useState<ITransport | undefined>(undefined)
    const [deleteQuestion, setDeleteQuestion] = useState<ReactNode>(<></>)

    const navigate = useNavigate();


    const deleteTransportHandler = (transport: ITransport | undefined) => {
        if (transport) {
            try {
                deleteTransport(transport).then((response) => {
                        if (response) {
                            removeTransport(transport.id);
                            successful(`Транспорт ${transport.transport_name} успешно удалён`)
                        }
                    }
                )
            } catch (e) {
                unsuccessful((e as Error).message);
            }
        }
    }

    return (
        <div className={styles.transfers}>
            <h1 className={styles.transfers__title}>Транспорты</h1>
            <div className={styles.transfers__btn}>
                <AppButton type={'button'} value={'Создать транспорт'} onClick={() => navigate('/transfers/new_transfer')}/>
            </div>
            <div className={styles.transfers__list}>
                {
                    transportList.length > 0
                        ? transportList.map(transport => (
                            <StandardFade>
                            <TransportItem key={transport.id} transport={transport} onDelete={
                                (event) => {
                                    event.stopPropagation();
                                    setDeleteTransportState(transport);
                                    setDeleteIsVisible(true);
                                    setDeleteQuestion(
                                        <p>Вы уверены, что хотите удалить транспорт {transport.transport_name}?</p>
                                    )}
                            }
                            />
                            </StandardFade>
                        ))
                        : <div className={styles.transfers__item_text}>Пока что у Вас нет созданных шаблонов</div>
                }
            </div>
            <AppDeleteConfirm
                question={deleteQuestion}
                onConfirm={() => deleteTransportHandler(deleteTransportState)}
                isVisible={deleteIsVisible}
                setIsVisible={setDeleteIsVisible}/>
        </div>
    )
};

export default TransportPage;