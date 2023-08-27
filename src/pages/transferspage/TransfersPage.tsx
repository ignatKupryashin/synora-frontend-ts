import React from 'react';
import styles from "./TransferPage.module.scss"
import {Link} from "react-router-dom";
import {ITransport} from "../../models/ITransport";
import {useTransportStore} from "../../store/transportStore/useTransportStore";


interface ITransfer {
	id: number,
	title: string,
	transport_1: string,
	temlateTitle_1: string,
	temlateTitle_2: string,
	transport_2: string

}


const TransfersPage = () => {
	const transfersArr: ITransfer[] = [];
	const transportList:ITransport[] = useTransportStore(state => state.transports);

		return (
			<div className={styles.transfers}>
				<h1 className={styles.transfers__title}>Транспорты</h1>
				<div className={styles.transfers__btn}>
					<Link to='/transfers/new_transfer' className={styles.transfers__btn_link}>Создать транспорт</Link>
				</div>
				<div className={styles.transfers__list}>
					{
						transportList.length > 0
							? transportList.map(transport => (
								<div key={transport.id} className={styles.transfers__item}>
									<div className={styles.transfers__item_title}>{transport.transport_name}</div>
									<div className={styles.transfers__item}>
										{transport.protocol_name}
									</div>
								</div>
							))
							: <div className={styles.transfers__item_text}>Пока что у Вас нет созданных транспортов</div>
					}


					{/*{transfersArr.length > 0*/}
					{/*	? transfersArr.map(transfer => (*/}
					{/*		<div key={transfer.id} className={styles.transfers__item}>*/}
					{/*			<div className={styles.transfers__item_title}>{transfer.title}</div>*/}
					{/*			<div className={styles.transfers__item}>*/}
					{/*				<span className={`${styles.transfers__item_text} ${transfer.title === 'Транспорт_1' && styles.transfers__item_text_red}`}>*/}
					{/*					{`${transfer.temlateTitle_1} ${transfer.transport_1 && '  /  ' + transfer.transport_1}`}*/}
					{/*				</span>*/}
					{/*			</div>*/}
					{/*			<div className={styles.transfers_}>*/}
					{/*				<span className={styles.transfers__item_text}>{`${transfer.temlateTitle_2 && transfer.temlateTitle_2 + '  /  ' + transfer.transport_2}`}</span>*/}
					{/*			</div>*/}
					{/*		</div>*/}
					{/*	))*/}
					{/*	: <div className={styles.transfers__item_text}>Пока что у Вас нет созданных транспортов</div>*/}
					{/*}*/}
				</div>
			</div>
		)
};

export default TransfersPage;