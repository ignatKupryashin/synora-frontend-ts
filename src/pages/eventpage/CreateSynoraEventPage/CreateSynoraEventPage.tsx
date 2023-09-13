import React, {useState} from 'react';
import styles from "../EventPage.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useUserStore} from "../../../store/userStore/useUserStore";
import {useSynoraEventStore} from "../../../store/eventStore/useSynoraEventStore";
import SynoraEvent from "../../../models/SynoraEvent/SynoraEvent";
import AppInput from "../../../components/Input/AppInput";
import {useFetching} from "../../../hooks/useFetching";
import {successful, unsuccessful} from "components/UI/Toast/Toast";
import {useProjectStore} from "../../../store/projectStore/useProjectStore";

const CreateSynoraEventPage = () => {
	const [eventName, setEventName] = useState('');

	const sendEvent = useSynoraEventStore(state => state.sendEvent);
	const addEvent = useSynoraEventStore(state => state.addEvent);
	const userId = useUserStore(state => state.userId)();
	const projectId = useProjectStore(state => state.currentProject?.id) || '';
	const navigate = useNavigate();

	const newSynoraEvent: SynoraEvent = new SynoraEvent(
		eventName,
		userId,
		projectId
	);


	const [mySendEvent,
		sendEventIsLoading] = useFetching(
		() => sendEvent(newSynoraEvent))

	const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await mySendEvent().then((response) => {
			if (response) {
				if (response.status >= 200 && response.status < 300) {
					addEvent(response.data)
					successful('Событие создано');
					navigate('/events');
				} else {
					unsuccessful(`Ошибка создания: ${response.data.detail}`)
				}
			}
		})
	}

		const changeEventName = (e: React.FormEvent<HTMLInputElement>) => {
			setEventName(e.currentTarget.value);
		}


		return (
			<div className={styles.event}>
				<Link to='/events' className={styles.event_back}>Назад</Link>
				<h1 className={styles.event__title}>Создать событие</h1>
				<form onSubmit={formSubmit} className={styles.event__form}>
					<AppInput
						id={'eventName'}
						label={'Наименование события:'}
						type={'text'}
						name={'eventName'}
						placeholder={'Введите наименование события'}
						onChange={changeEventName}
					/>

					<div className={styles.event__form_btn}>
						<button type="submit" className={styles.event__form_btn_link}>Создать</button>
					</div>
					{
						sendEventIsLoading && <h1>Идет отправка</h1>
					}

				</form>
			</div>
		)
	};
export default CreateSynoraEventPage;