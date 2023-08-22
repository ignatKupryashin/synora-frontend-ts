import React from 'react';
import {loadEvents} from "../../tools/loaders";
import styles from "./EventPage.module.scss";
import {Link} from "react-router-dom";

const EventsPage = () => {
	const eventsArr = loadEvents();
	return (
		<div className={styles.events}>
			<h1 className={styles.events__title}>События</h1>
			<div className={styles.events__btn}>
				<Link to='/events/new_event' className={styles.events__btn_link}>Создать событие</Link>
			</div>
			<div className={styles.events__list}>
				{eventsArr.map(event => (
						<div key={event.id} className={styles.events__item}>
							<div className={styles.events__item_title}>{event.title}</div>
							<div className={styles.events__item}>
							<span className={`${styles.events__item_text} ${event.title === 'Событие_1' && styles.events__item_text_red}`}>
								{`${event.templateTitle_1} ${event.transport_1 && '  /  ' + event.transport_1}`}
							</span>
							</div>
							<div className={styles.events_}>
								<span className={styles.events__item_text}>{`${event.templateTitle_2 && event.templateTitle_2 + '  /  ' + event.transport_2}`}</span>
							</div>
						</div>
					)
				)}
			</div>
		</div>
    );
};

export default EventsPage;