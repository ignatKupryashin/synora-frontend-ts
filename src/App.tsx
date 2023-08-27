import React, {useEffect} from 'react';
import AppRouter from "./components/AppRouter/AppRouter";
import styles from "App.module.scss"
import {projectIdMock, userIdMock} from "./mocks/userDataMocks";
import {useUserStore} from "./store/userStore/useUserStore";
import {useTransportStore} from "./store/transportStore/useTransportStore";

function App() {
	const setUserId = useUserStore(state => state.setUserId);
	const setProjectId = useUserStore(state => state.setProjectId);

	//Установить учетную запись по умолчанию
	setUserId(userIdMock);
	setProjectId(projectIdMock);

	const transports = useTransportStore(state => state.transports)
	const fetchTransports = useTransportStore(state => state.fetchTransports);


	const userId: string = useUserStore((state) => state.userId);
	const projectId: string = useUserStore((state) => state.userId);

	useEffect(() => {
		fetchTransports(userId, projectId);
	}, [])

	console.log(transports);

  return (
	  <div className={styles.wrapper}>
		<AppRouter/>
	  </div>
  );
}

export default App;
