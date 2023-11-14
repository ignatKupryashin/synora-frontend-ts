import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout = () => {
    return (
        <div className={styles.wrapper}>
            {/*<div className={styles.layout}>*/}
                <Sidebar/>
                <div className={styles.layout__body}>
                    <Header/>
                    <main className={styles.outlet__container}>
                        <Outlet/>
                    </main>
                </div>
            {/*</div>*/}
        </div>
    )
};

export default Layout;