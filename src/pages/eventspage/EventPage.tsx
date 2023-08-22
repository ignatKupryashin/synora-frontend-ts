import React, {useState} from 'react';
import styles from "./EventPage.module.scss"
import {Link} from "react-router-dom";

const EventPage = () => {
	const [eventAction, setEventAction] = useState('');

	const formSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		console.log(eventAction);
	}


	return (
		<div className={styles.event}>
			<Link to='/events' className={styles.event_back}>Назад</Link>
			<h1 className={styles.event__title}>Создать событие</h1>
			<form onSubmit={formSubmit} className={styles.event__form}>
				{/*<InputText*/}
				{/*	id="newevent"*/}
				{/*	name="newevent"*/}
				{/*	value={eventAction}*/}
				{/*	onChange={e => setEventAction(e.target.nodeValue)}*/}
				{/*	label="Название события"*/}
				{/*	styleName="event"*/}
				{/*/>*/}
				<div className={styles.event__form_btn}>
					<button type="submit" className={styles.event__form_btn_link}>Создать</button>
				</div>
			</form>
		</div>
	)
};

export default EventPage;