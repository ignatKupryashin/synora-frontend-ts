import React, {ChangeEventHandler, FC, useState} from 'react';
import styles from './TransferPage.module.scss';
import InputText from "../../components/Input/InputText";
import {Link} from "react-router-dom";
import {InputLabel} from "@mui/material";
import createTelegramTransport from "./CreateTelegramTransportPage";
import CreateTelegramTransportPage from "./CreateTelegramTransportPage";
import CreateEmailTransportPage from "./CreateEmailTransportPage";

const CreateTransferPage:FC = () => {


	const [transport, setTransport] = useState('');
	const [telegram, setTelegram] = useState({transferName: '', transferBot: '', transferToken: ''});



	//Функция для изменения вида транспорта. Мб как то иначе сделать.
	const transportChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
			setTransport(e.currentTarget.value);
		}

		const formSubmit = (e: { preventDefault: () => void; }) => {
			e.preventDefault();
		}

		return (
			<div>
				<Link to='/transfers' className={styles.transfer_back}>Назад</Link>
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
					<CreateEmailTransportPage/>)
				}
				{transport === 'telegram' && (
					<CreateTelegramTransportPage/>
				)
				}
			</div>
		)
};

export default CreateTransferPage;