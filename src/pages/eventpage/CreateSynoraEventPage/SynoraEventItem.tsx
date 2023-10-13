import React, {MouseEventHandler} from 'react';
import {ISynoraEvent} from "../../../models/SynoraEvent/ISynoraEvent";
import styles from "../EventPage.module.scss";
import {useNavigate} from "react-router-dom";
import DeleteButton from "../../../components/UI/FunctionalButtons/DeleteButton/DeleteButton";

interface synoraEventItemProps {
    synoraEvent: ISynoraEvent;
    onDelete: MouseEventHandler;
    onEdit?: MouseEventHandler;
}

const SynoraEventItem = (props: synoraEventItemProps) => {

    const navigate = useNavigate();

    return (
        <div key={props.synoraEvent.id} className={styles.eventItem} onClick={event => navigate(`/events/${props.synoraEvent.id}`)}>
            <div className={styles.eventItem__title} >
                {props.synoraEvent.event_code}
            </div>
            <DeleteButton onDelete={props.onDelete}/>
        </div>
    );
};

export default SynoraEventItem;