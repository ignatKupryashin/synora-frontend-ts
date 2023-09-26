import React from 'react';
import styles from "./Header.module.scss";
import {useUserStore} from "../../store/userStore/useUserStore";
import {useProjectStore} from "../../store/projectStore/useProjectStore";
import AppButton from "../UI/AppButton/AppButton";
import AppSelect, {AppSelectOption} from "../UI/AppSelect/AppSelect";
import {IProject} from "../../models/Project/IProject";
import {useNavigate} from "react-router-dom";

const Header = () => {
	const userName: string | undefined = useUserStore(state => state.user?.name);
	const projectName: string | undefined = useProjectStore((state) => state.currentProject?.name);
	const logout = useUserStore(state => state.logout);
	const projects = useProjectStore(state => state.projects);
	const currentProject = useProjectStore(state => state.currentProject);
	const setCurrentProject = useProjectStore(state => state.setCurrentProject);
	const navigate = useNavigate();

	const logoutHandler = () => {
		logout();
		navigate('/');
	}

	const projectOptions: AppSelectOption<IProject>[] = [];
	projects.map((item) => projectOptions.push({
		value: item,
		label: item.name
	}))

	return (
		<div className={styles.header}>
			{/*<div className={styles.header__item}>*/}
			{/*	<p className={styles.header__item__title}>Проект:</p>*/}
			{/*</div>*/}
			{projects.length > 0
				?
				<AppSelect
					value={currentProject}
					options={projectOptions}
					label="Проект"
					onChange={(e) => setCurrentProject(e.target.value)} id={"1"}/>
			:
				<p className={styles.header__item__text}>У вас нет проектов</p>
			}
			<div className={styles.header__item}>
				<p className={styles.header__item__title}>Пользователь:</p>
				<p className={styles.header__item__text}>{userName ? userName : 'нет юзера'}</p>
			</div>

			<AppButton type={"button"} value={'Выйти'} onClick={logoutHandler}/>
		</div>
	)
};

export default Header;