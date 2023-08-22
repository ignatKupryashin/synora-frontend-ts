import React, {FC, useState} from 'react';
import styles from './TransferPage.module.scss';
import InputText from "../../components/Input/InputText";
import {Link} from "react-router-dom";

const TransferPage:FC = () => {


	const [transport, setTransport] = useState('');
	const [telegram, setTelegram] = useState({transferName: '', transferBot: '', transferToken: ''});


	//разобраться зачем вообще данная функция
		// @ts-ignore
	const transportChangeHandler = ({target: {value}}) => {
			setTransport(value);
		}

		const formSubmit = (e: { preventDefault: () => void; }) => {
			e.preventDefault();
		}

		return (
			<div className={styles.transfer}>
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
				{transport === 'email' && <></>}
				{transport === 'telegram' && (
					<>
						<form onSubmit={formSubmit} className={styles.transfer__create}>
							<InputText
								id="transfer_name"
								name="transfer_name"
								value={telegram.transferName}
								// onChange={}
								label="Название транспорта"
								styleName="transfer"
							/>
							<InputText
								id="transfer_bot"
								name="transfer_bot"
								value={telegram.transferBot}
								// onChange={}
								label="Бот Telegram"
								styleName="transfer"
							/>
							<InputText
								id="transfer_token"
								name="transfer_token"
								value={telegram.transferToken}
								// onChange={}
								label="Токен бота"
								styleName="transfer"
							/>
							<div className={styles.transfer__create_btn}>
								<button type="submit" className={styles.transfer__create_btn_link}>Создать</button>
							</div>
						</form>
					</>
				)
				}
			</div>
		)
};

export default TransferPage;