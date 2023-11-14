import React, {useState} from 'react';
import styles from '../TransportPage.module.scss';
import CreateTelegramTransportPage from "./CreateTelegramTransportPage";
import CreateEmailTransportPage from "./CreateEmailTransportPage";
import {ReturnsProp} from "../../../models/ServiveInterfaces/ReturnsProp";
import AppButton from "../../../components/UI/AppButton/AppButton";

const CreateTransportPage = (props: ReturnsProp) => {

	const [transport, setTransport] = useState('');

	const transportChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
			setTransport(e.currentTarget.value);
		}

		return (
			<div>
				<AppButton value={""} onClick={props.backAction} type={"button"} className={styles.transfer_back}/>
				<h1 className={styles.transfer__title}>Создать транспорт</h1>
				<div className={styles.transfer__form_radio}>
					<div className={styles.transfer__form_radio_btn}>
						<label htmlFor="email" className={styles.transfer__form_radio_label}>
							<input
								type="radio"
								id="email"
								name="transfer"
								value="email"
								checked={transport === "email"}
								onChange={transportChangeHandler}
								className={styles.transfer__form_radio_input}
							/>
							E-mail
						</label>
					</div>
					<div className={styles.transfer__form_radio_btn}>
						<label htmlFor="telegram" className={styles.transfer__form_radio_label}>
							<input
								type="radio"
								id="telegram"
								name="transfer"
								value="telegram"
								checked={transport === "telegram"}
								onChange={transportChangeHandler}
								className={styles.transfer__form_radio_input}
							/>
							Telegram
						</label>
					</div>
				</div>
				{transport === 'email' && (
					<CreateEmailTransportPage backAction={props.backAction}/>)
				}
				{transport === 'telegram' && (
					<CreateTelegramTransportPage backAction={props.backAction}/>
				)
				}
			</div>
		)
};

export default CreateTransportPage;