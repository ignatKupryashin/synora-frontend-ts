import React, {ReactNode, useEffect, useState} from 'react';
import styles from "./TransportPage.module.scss"
import {useNavigate} from "react-router-dom";
import {ITransport} from "../../models/Transport/ITransport";
import {useTransportStore} from "../../store/transportStore/useTransportStore";
import TransportItem from "./TransportItem";
import {successful, unsuccessful} from "../../components/UI/Toast/Toast";
import AppButton from "../../components/UI/AppButton/AppButton";
import StandardFade from "../../components/Animations/StandardFade";
import AppDeleteConfirm from "../../components/AppDeleteConfirm/AppDeleteConfirm";
import AppModal from "../../components/UI/AppModal/AppModal";
import TransportViewPage from "./TransportViewPage/TransportViewPage";
import loginPage from "../LoginPage/LoginPage";


const TransportPage = () => {
    const transportList: ITransport[] = useTransportStore(state => state.transports);
    const deleteTransport = useTransportStore(state => state.deleteTransport)
    const removeTransport = useTransportStore(state => state.removeTransport)
    const [deleteIsVisible, setDeleteIsVisible] = useState(false);
    const [deleteTransportState, setDeleteTransportState] = useState<ITransport | undefined>(undefined)
    const [deleteQuestion, setDeleteQuestion] = useState<ReactNode>(<></>)

    const [viewItemIsVisible, setViewItemIsVisible] = useState(false);
    const [viewItem, setViewItem] = useState<ITransport | undefined>(undefined);


    const navigate = useNavigate();


    useEffect(() => {
        // console.log(transportList);
    }, []);


    const deleteTransportHandler = (transport: ITransport) => {
            try {
                deleteTransport(transport).then((response) => {
                        if (response) {
                            successful(`Транспорт ${transport.transport_name} успешно удалён`)
                        }
                        else {
                            unsuccessful(`Транспорт ${transport.transport_name} не удалось удалить`)
                        }
                    }
                )
            } catch (e) {
                unsuccessful((e as Error).message);
            }
    }

    return (
        <div className={styles.transfers}>
            <h1 className={styles.transfers__title}>Транспорты</h1>
            <div className={styles.transfers__btn}>
                <AppButton type={'button'} value={'Создать транспорт'}
                           onClick={() => navigate('/transfers/new_transfer')}/>
            </div>
            <div className={styles.transfers__list}>
                {
                    transportList.length > 0
                        ? transportList.map(transport => (
                            <StandardFade key={transport.id}>
                                <TransportItem key={transport.id}
                                               transport={transport}
                                               onDelete={
                                                   (event) => {
                                                       event.stopPropagation();
                                                       setDeleteTransportState(transport);
                                                       setDeleteIsVisible(true);
                                                       setDeleteQuestion(
                                                           <p>Вы уверены, что хотите удалить
                                                               транспорт {transport.transport_name}?</p>
                                                       )
                                                   }
                                               }
                                               onView={() => {
                                                   setViewItem(transport);
                                                   setViewItemIsVisible(true);

                                               }}
                                />
                            </StandardFade>
                        ))
                        : <div className={styles.transfers__item_text}>Пока что у Вас нет созданных транспортов</div>
                }
            </div>
            <AppDeleteConfirm
                question={deleteQuestion}
                onConfirm={deleteTransportState && (() => deleteTransportHandler(deleteTransportState))}
                isVisible={deleteIsVisible}
                setIsVisible={setDeleteIsVisible}/>

            <AppModal visible={viewItemIsVisible} setVisible={setViewItemIsVisible}>
                {/*<TabBar barArray={tabsArray}/>*/}
                <TransportViewPage viewItem={viewItem}/>
            </AppModal>

        </div>
    )
};

export default TransportPage;