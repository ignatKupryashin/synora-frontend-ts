import React, {MouseEventHandler} from 'react';
import {ISynoraEvent} from "../../../models/SynoraEvent/ISynoraEvent";
import styles from "../EventPage.module.scss";
import {useNavigate} from "react-router-dom";
import DeleteButton from "../../../components/UI/FunctionalButtons/DeleteButton/DeleteButton";
import ViewButton from "../../../components/UI/FunctionalButtons/VuewButton/ViewButton";

interface synoraEventItemProps {
    synoraEvent: ISynoraEvent;
    onDelete: MouseEventHandler;
    onEdit?: MouseEventHandler;
}

const SynoraEventItem = (props: synoraEventItemProps) => {

    const navigate = useNavigate();

    return (
        <div key={props.synoraEvent.id} className={styles.eventItem}
             onClick={event => navigate(`/events/sendnotification/${props.synoraEvent.id}`)}>
            <div className={styles.eventItem__title}>
                {props.synoraEvent.event_code}
            </div>
            <div className={styles.eventItem__buttonWrapper}>
                {/*<ViewButton onClick={() => navigate(`events/createeventmaster/${props.synoraEvent.id}`)}/>*/}
                <DeleteButton onDelete={props.onDelete}/>
            </div>
        </div>
    );
};

export default SynoraEventItem;