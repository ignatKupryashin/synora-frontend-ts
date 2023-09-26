import React, {MouseEventHandler} from 'react';
import {ISynoraEvent} from "../../../models/SynoraEvent/ISynoraEvent";
import styles from "../EventPage.module.scss";
import deleteIcon from "../../../assets/svg/delete-icon.svg";
import {useNavigate} from "react-router-dom";

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
            <button className={styles.eventItem__deleteButton} onClick={(e) => props.onDelete(e)}>
                <img src={deleteIcon} alt='удалить'/>
            </button>
        </div>
    );
};

export default SynoraEventItem;