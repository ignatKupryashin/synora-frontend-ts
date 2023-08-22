import React from 'react';
import AppRouter from "./components/AppRouter/AppRouter";
import styles from "App.module.scss"
import Layout from "./components/Layout/Layout";

function App() {
  return (
	  <div className={styles.wrapper}>
		<AppRouter/>
	  </div>
  );
}

export default App;
