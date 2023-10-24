import React, {ReactNode, useState} from 'react';
import styles from "./EventPage.module.scss";
import {useNavigate} from "react-router-dom";
import {ISynoraEvent} from "../../models/SynoraEvent/ISynoraEvent";
import {useSynoraEventStore} from "../../store/eventStore/useSynoraEventStore";
import SynoraEventItem from "./CreateSynoraEventPage/SynoraEventItem";
import {successful, unsuccessful} from "../../components/UI/Toast/Toast";
import AppDeleteConfirm from "../../components/AppDeleteConfirm/AppDeleteConfirm";
import AppButton from "../../components/UI/AppButton/AppButton";
import StandardFade from "../../components/Animations/StandardFade";

const SynoraEventPage = () => {
    const eventsList: ISynoraEvent[] = useSynoraEventStore(state => state.events);
    const deleteEvent = useSynoraEventStore(state => state.deleteEvent);
    const removeEvent = useSynoraEventStore(state => state.removeEvent);
    const [deleteIsVisible, setDeleteIsVisible] = useState(false);
    const [deleteEventState, setDeleteEventState] = useState<ISynoraEvent | undefined>(undefined)
    const [deleteQuestion, setDeleteQuestion] = useState<ReactNode>(<></>)

    const navigate = useNavigate();

    const deleteSynoraEventHandler = (synoraEvent: ISynoraEvent | undefined) => {
        if (synoraEvent) {
            try {
                deleteEvent(synoraEvent).then((response) => {
                        if (response) {
                            removeEvent(synoraEvent.id);
                            successful(`Событие "${synoraEvent.event_code}" успешно удалено`)
                        }
                    }
                )
            } catch (e) {
                unsuccessful((e as Error).message);
            }
        }
    }


    return (
        <div className={styles.events}>
            <h1 className={styles.events__title}>События</h1>
            <div className={styles.events__btn}>
                <AppButton type={"button"} value={"Создать событие"} onClick={() => navigate('/events/new_event')}/>
            </div>
            <div className={styles.events__list}>
                {eventsList.length > 0 ?
                    eventsList.map(event => (
                        <StandardFade key={event.id}>
                            <SynoraEventItem key={event.id} synoraEvent={event}
                                             onDelete={
                                                 (e) => {
                                                     e.stopPropagation()
                                                     setDeleteEventState(event);
                                                     setDeleteIsVisible(true);
                                                     setDeleteQuestion(
                                                         <p>Вы уверены, что хотите удалить {event.event_code}?</p>
                                                     )
                                                 }}/>
                        </StandardFade>
                    ))
                    :
                    "У вас нет созданных событий"
                }
            </div>
            <AppDeleteConfirm
                question={deleteQuestion}
                onConfirm={() => deleteSynoraEventHandler(deleteEventState)}
                isVisible={deleteIsVisible}
                setIsVisible={setDeleteIsVisible}/>
        </div>
    );
};

export default SynoraEventPage;