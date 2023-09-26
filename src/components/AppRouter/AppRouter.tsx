import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/homepage/HomePage";
import SynoraEventPage from "../../pages/eventpage/SynoraEventPage";
import TransfersPage from "../../pages/transferspage/TransfersPage";
import CreateTransferPage from "../../pages/transferspage/CreateTransferPages/CreateTransferPage";
import NotFoundPage from "../../pages/notfoundpage/NotFoundPage";
import TemplatePage from "../../pages/templatepage/TemplatePage";
import CreateTemplatePage from "../../pages/templatepage/CreateTemplatesPages/CreateTemplatePage";
import CreateSynoraEventPage from "../../pages/eventpage/CreateSynoraEventPage/CreateSynoraEventPage";
import {useUserStore} from "../../store/userStore/useUserStore";
import LoginPage from "../../pages/loginpage/LoginPage";
import SynoraEventItemPage from "../../pages/eventpage/EventItemPage/SynoraEventItemPage";
import SendNotificationPage from "../../pages/sendnotificationpage/SendNotificationPage";

const AppRouter = () => {
    const isLogin = useUserStore(state => state.isLogin);
    return (
        <Routes>
            {isLogin
                ?
            <Route path='/' element={<Layout/>}>
                    <><Route index element={<HomePage/>}/>
                        <Route path='events' element={<SynoraEventPage/>}/>
                        <Route path='events/:synoraEventId' element={<SynoraEventItemPage/>}/>
                        <Route path='events/new_event' element={<CreateSynoraEventPage/>}/>
                        <Route path='transfers' element={<TransfersPage/>}/>
                        <Route path='transfers/new_transfer' element={<CreateTransferPage/>}/>
                        <Route path='templates' element={<TemplatePage/>}/>
                        <Route path='templates/new_template' element={<CreateTemplatePage/>}/>
                        <Route path='events/sendnotification/:currentEventId' element={<SendNotificationPage/>}/>
                        <Route path='*' element={<NotFoundPage/>}/>
                    </>
            </Route>
                :
            <Route index path="*" element={<LoginPage/>}/>
            }
        </Routes>

    );
};

export default AppRouter;