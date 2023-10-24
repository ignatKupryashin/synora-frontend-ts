import React, {FC} from 'react';
import styles from "./HomePage.module.scss";
import {useNavigate} from "react-router-dom";
import {loadActions} from "../../tools/loaders";
import {IAction} from "../../models/IAction";
import StandardFade from "../../components/Animations/StandardFade";
import AppButton from "../../components/UI/AppButton/AppButton";

const HomePage: FC = () => {

	const actionArr:IAction[] = loadActions();
	const navigate = useNavigate();

	return (
		<div className={styles.homepage}>
			<h1 className={styles.homepage__title}>Главная</h1>
			<div className={styles.homepage__content}>
				<section className={styles.homepage__steps}>
					{actionArr.map(step => (
						<StandardFade key={step.id}>
							<article  className={styles.homepage__step}>
								<div className={styles.homepage__step_title}>{step.title}</div>
								<div className={styles.homepage__step_body}>
									<div className={styles.homepage__step_block}>
										<h2 className={styles.homepage__step_block_title}>{step.action}</h2>
										<p className={styles.homepage__step_block_text}>{step.actionText}.</p>
									</div>
									<div className={styles.homepage__step_btn}>
										<AppButton type={'button'} value={step.actionBtn} onClick={() => navigate(step.actionLink)}/>
									</div>
								</div>
							</article>
							</StandardFade>
						)
					)}
				</section>
				<section className={styles.homepage__data}>
					{/*<article className={styles.homepage__infoblock}>*/}
					{/*	<h3 className={styles.homepage__infoblock_title}>Вам доступно:</h3>*/}
					{/*	<div className={styles.homepage__infoblock_statistic}>*/}
					{/*		{statisticData.map(data => (*/}
					{/*				<div key={data.id} className={styles.homepage__infoblock_info}>*/}
					{/*					<CircularProgressWithLabel*/}
					{/*							sx={{*/}
					{/*								color: '#0093F0',*/}
					{/*								fontColor:'100'*/}
					{/*							}}*/}
					{/*								size={100}*/}
					{/*								thickness={7}*/}
					{/*						value={data.rate}*/}
					{/*					/>*/}
					{/*					<div className={styles.homepage__infoblock_digit}>{data.amount}</div>*/}
					{/*					<div className={styles.homepage__infoblock_text}>{data.text}</div>*/}
					{/*				</div>*/}
					{/*			)*/}
					{/*		)}*/}
					{/*	</div>*/}
					{/*	<div className={styles.homepage__infoblock_btnblock}>*/}
					{/*		<button className={styles.homepage__infoblock_btnblock_btn}>Пополнить баланс</button>*/}
					{/*	</div>*/}
					{/*</article>*/}
					{/*<div className={styles.homepage__infoblock_tariff}>*/}
					{/*	<h3 className={styles.homepage__infoblock_tariff_title}>Ваш тариф: Стандарт</h3>*/}
					{/*	<div className={styles.homepage__infoblock_tariff_btnblock}>*/}
					{/*		<button className={styles.homepage__infoblock_tariff_btn}>Изменить тариф</button>*/}
					{/*	</div>*/}
					{/*</div>*/}
					<div className={styles.homepage__infoblock_contact}>
						<h3 className={styles.homepage__infoblock_contact_title}>Свяжись с нами</h3>
						<p className={styles.homepage__infoblock_contact_text}>Если у вас возникли вопросы, напишите нам в телеграм:</p>
						{/*<a href={''} target={"_blank"} children={*/}
							<p className={styles.homepage__infoblock_contact_email}>@synora_help</p>
						{/*}*/}
						{/*/>*/}
					</div>
				</section>
			</div>
		</div>
	);
};

export default HomePage;