import React from 'react';
import styles from "./EventPage.module.scss";
import {Link} from "react-router-dom";
import {ISynoraEvent} from "../../models/SynoraEvent/ISynoraEvent";
import {useSynoraEventStore} from "../../store/eventStore/useSynoraEventStore";
import SynoraEventItem from "./CreateSynoraEventPage/SynoraEventItem";
import {successful, unsuccessful} from "../../components/UI/Toast/Toast";

const SynoraEventPage = () => {
	const eventsList: ISynoraEvent[] = useSynoraEventStore(state => state.events);
	const deleteEvent = useSynoraEventStore(state => state.deleteEvent);
	const removeEvent = useSynoraEventStore(state => state.removeEvent);

	const deleteSynoraEventHandler = (synoraEvent: ISynoraEvent) => {
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



	return (
		<div className={styles.events}>
			<h1 className={styles.events__title}>События</h1>
			<div className={styles.events__btn}>
				<Link to='/events/new_event' className={styles.events__btn_link}>Создать событие</Link>
			</div>
			<div className={styles.events__list}>
				{eventsList.length > 0 ?
					eventsList.map(event => (
						<SynoraEventItem synoraEvent={event} onDelete={() => deleteSynoraEventHandler(event)}/>
					))
						:
					"У вас нет созданных событий"
				}
			</div>
		</div>
    );
};

export default SynoraEventPage;