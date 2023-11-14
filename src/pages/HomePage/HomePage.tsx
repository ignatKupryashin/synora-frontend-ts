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
					<AppButton type={"button"} value={"Перейти к созданию рассылки"} onClick={() => navigate('createEventMaster')}/>
				</section>
				<section className={styles.homepage__data}>
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