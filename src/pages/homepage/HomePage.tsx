import React, {FC} from 'react';
import styles from "./HomePage.module.scss";
import {Link} from "react-router-dom";
import {loadActions, loadStatistics} from "../../tools/loaders";
import {IStatistic} from "../../models/IStatistic";
import {IAction} from "../../models/IAction";

const HomePage: FC = () => {

	const actionArr:IAction[] = loadActions();
	const statisticData: IStatistic[] = loadStatistics();

	return (
		<div className={styles.homepage}>
			<h1 className={styles.homepage__title}>Главная</h1>
			<div className={styles.homepage__content}>
				<section className={styles.homepage__steps}>
					{actionArr.map(step => (
							<article key={step.id} className={styles.homepage__step}>
								<div className={styles.homepage__step_title}>{step.title}</div>
								<div className={styles.homepage__step_body}>
									<div className={styles.homepage__step_block}>
										<h2 className={styles.homepage__step_block_title}>{step.action}</h2>
										<p className={styles.homepage__step_block_text}>{step.actionText}.</p>
									</div>
									<div className={styles.homepage__step_btn}>
										<Link to={step.actionLink} className={styles.homepage__step_btn_link}>
											{step.actionBtn}
										</Link>
									</div>
								</div>
							</article>
						)
					)}
				</section>
				<section className={styles.homepage__data}>
					<article className={styles.homepage__infoblock}>
						<h3 className={styles.homepage__infoblock_title}>Вам доступно:</h3>
						<div className={styles.homepage__infoblock_statistic}>
							{statisticData.map(data => (
									<div key={data.id} className={styles.homepage__infoblock_info}>
										<div className={styles.homepage__infoblock_rate}>{data.rate}</div>
										<div className={styles.homepage__infoblock_digit}>{data.amount}</div>
										<div className={styles.homepage__infoblock_text}>{data.text}</div>
									</div>
								)
							)}
						</div>
						<div className={styles.homepage__infoblock_btnblock}>
							<button className={styles.homepage__infoblock_btnblock_btn}>Пополнить баланс</button>
						</div>
					</article>
					<div className={styles.homepage__infoblock_tariff}>
						<h3 className={styles.homepage__infoblock_tariff_title}>Ваш тариф: Стандарт</h3>
						<div className={styles.homepage__infoblock_tariff_btnblock}>
							<button className={styles.homepage__infoblock_tariff_btn}>Изменить тариф</button>
						</div>
					</div>
					<div className={styles.homepage__infoblock_contact}>
						<h3 className={styles.homepage__infoblock_contact_title}>Свяжись с нами</h3>
						<p className={styles.homepage__infoblock_contact_text}>Если у вас возникли вопросы, напишите нам в телеграм:</p>
						<p className={styles.homepage__infoblock_contact_email}>@sinora_help</p>
					</div>
				</section>
			</div>
		</div>
	);
};

export default HomePage;