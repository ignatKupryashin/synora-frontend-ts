import React, {useEffect} from 'react';
import AppRouter from "./components/AppRouter/AppRouter";
import styles from "App.module.scss"
import {useUserStore} from "./store/userStore/useUserStore";
import {useTransportStore} from "./store/transportStore/useTransportStore";
import {useTemplateStore} from "./store/templateStore/useTemplateStore";
import {useSynoraEventStore} from "./store/eventStore/useSynoraEventStore";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {useProjectStore} from "./store/projectStore/useProjectStore";
import {unsuccessful} from "./components/UI/Toast/Toast";

function App() {

	//Скорее всего можно удалить

	// const setUserId = useUserStore(state => state.setUserId);
	// const setProjectId = useUserStore(state => state.setProjectId);

	//Установить учетную запись по умолчанию
	// setUserId(userIdMock);
	// setProjectId(projectIdMock);

	const fetchTransports = useTransportStore(state => state.fetchTransports);
	const fetchTemplates = useTemplateStore(state => state.fetchTemplates);
	const fetchEvents = useSynoraEventStore(state => state.fetchEvents);
	const userId: string | undefined = useUserStore((state) => state.user?.id);
	const projectId: string | undefined = useProjectStore((state) => state.currentProject?.id);
	const fetchProjects = useProjectStore(state => state.fetchProjects);
	const fetchLinks = useProjectStore(state => state.fetchLinks);
	const projects = useProjectStore(state => state.projects);
	const setProjects = useProjectStore(state => state.setProjects);
	const setCurrentProject = useProjectStore(state => state.setCurrentProject);

	useEffect(() => {
		try {
		if (userId !== undefined) {
			(fetchLinks(userId)).then((response) => fetchProjects(response)).then(
				(response) => (
					setProjects(response),
				setCurrentProject(response[0]))
		)}}
		catch (e) {
			unsuccessful((e as Error).message)
		}
	}, [userId]);


	useEffect(() => {
		if (userId !== undefined && projectId !== undefined) {
			try {
				fetchTransports(userId, projectId)
				fetchTemplates(userId, projectId);
				fetchEvents(userId, projectId);
			}
			catch (e) {
				unsuccessful((e as Error).message)
			}
		}
	}, [projectId])

  return (
	  <div className={styles.wrapper}>
		<AppRouter/>
		  <ToastContainer />
	  </div>
  );
}

export default App;
