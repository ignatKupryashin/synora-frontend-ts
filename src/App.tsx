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
import {IProject} from "./models/Project/IProject";

function App() {

	const fetchTransports = useTransportStore(state => state.fetchTransports);
	const fetchTemplates = useTemplateStore(state => state.fetchTemplates);
	const fetchEvents = useSynoraEventStore(state => state.fetchEvents);
	const userId: string | undefined = useUserStore((state) => state.user?.id);
	const projectId: string | undefined = useProjectStore((state) => state.currentProject?.id);
	const fetchProjects = useProjectStore(state => state.fetchProjects);
	// const fetchLinks = useProjectStore(state => state.fetchLinks);
	const projects = useProjectStore(state => state.projects);
	const setProjects = useProjectStore(state => state.setProjects);
	const setCurrentProject = useProjectStore(state => state.setCurrentProject);
	const createProject = useProjectStore(state => state.createProject);
	const logout = useUserStore(state => state.logout);

	const loadProjects = async (currentUser: string, firstTry: boolean) => {
		let data = await (fetchProjects(currentUser))
		console.log(data)
		if (data.length > 0) {
			acceptProjects(data);
		}
		else {
			if (firstTry){
			createProject(currentUser).then(async (response) => {
				if (response) {
					await loadProjects(currentUser, false);
				}
				else {
					unsuccessful("Ошибка создания первого проекта. Свяжитесь с поддержкой")
					logout();
				}
			})}
		else {
				unsuccessful("Ошибка загрузки проекта. Свяжитесь с поддержкой")
				logout();
		}
		}
	}

	const acceptProjects = (data: IProject[]) => {
		setProjects(data)
		setCurrentProject(data[0])
	}

	useEffect(() => {
		try {
		if (userId !== undefined) {
			loadProjects(userId, true);
		}}
		catch (e) {
			unsuccessful((e as Error).message)
		}
		console.log(projects);
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
	  <div className={styles.app}>
		<AppRouter/>
		  <ToastContainer />
	  </div>
  );
}

export default App;
