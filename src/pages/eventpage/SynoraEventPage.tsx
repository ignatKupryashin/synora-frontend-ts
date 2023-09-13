import React from 'react';
import styles from "./EventPage.module.scss";
import {Link} from "react-router-dom";
import {ISynoraEvent} from "../../models/SynoraEvent/ISynoraEvent";
import {useSynoraEventStore} from "../../store/eventStore/useSynoraEventStore";

const SynoraEventPage = () => {
	const eventsList: ISynoraEvent[] = useSynoraEventStore(state => state.events);


	return (
		<div className={styles.events}>
			<h1 className={styles.events__title}>События</h1>
			<div className={styles.events__btn}>
				<Link to='/events/new_event' className={styles.events__btn_link}>Создать событие</Link>
			</div>
			<div className={styles.events__list}>
				{eventsList.length > 0 ?
					eventsList.map(event => (
						<div key={event.id} className={styles.events__item}>
							<div className={styles.events__item_title}>{event.event_code}</div>
						</div>
					))
						:
					"У вас нет созданных событий"
				}
			</div>
		</div>
    );
};

export default SynoraEventPage;