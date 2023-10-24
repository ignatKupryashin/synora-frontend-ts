import React from 'react';
import styles from "./Header.module.scss";
import {useUserStore} from "../../store/userStore/useUserStore";
import {useProjectStore} from "../../store/projectStore/useProjectStore";
import {AppSelectOption} from "../UI/AppSelect/AppSelect";
import {IProject} from "../../models/Project/IProject";
import {useNavigate} from "react-router-dom";
import UserPic from "../UI/UserPic/UserPic";

const Header = () => {
	const user = useUserStore(state => state.user);
	const userName = user?.data.name || user?.data.login;
	const projectName: string | undefined = useProjectStore((state) => state.currentProject?.name);
	const projects = useProjectStore(state => state.projects);
	const currentProject = useProjectStore(state => state.currentProject);
	const setCurrentProject = useProjectStore(state => state.setCurrentProject);
	const navigate = useNavigate();




	const projectOptions: AppSelectOption<IProject>[] = [];
	projects.map((item) => projectOptions.push({
		value: item,
		label: item.name
	}))

	return (
		<div className={styles.header}>
			{/*{projects.length > 0*/}
			{/*	?*/}
			{/*	<AppSelect*/}
			{/*		value={currentProject}*/}
			{/*		options={projectOptions}*/}
			{/*		label="Проект"*/}
			{/*		onChange={(e) => setCurrentProject(e.target.value)} id={"1"}/>*/}
			{/*:*/}
			{/*	<p className={styles.header__item__text}>У вас нет проектов</p>*/}
			{/*}*/}

			<UserPic user={userName ? userName : " "}/>
		</div>
	)
};

export default Header;