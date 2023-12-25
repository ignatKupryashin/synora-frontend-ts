import React from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import Layout from "../Layout/Layout";
import SynoraEventPage from "../../pages/eventpage/SynoraEventPage";
import TransportPage from "../../pages/TransportPage/TransportPage";
import TemplatePage from "../../pages/TemplatePage/TemplatePage";
import CreateTemplatePage from "../../pages/TemplatePage/CreateTemplatesPages/CreateTemplatePage";
import {useUserStore} from "../../store/userStore/useUserStore";
import LoginPage from "../../pages/LoginPage/LoginPage";
import SynoraEventItemPage from "../../pages/eventpage/EventItemPage/SynoraEventItemPage";
import SendNotificationPage from "../../pages/sendnotificationpage/SendNotificationPage";
import CreateTransportPage from "../../pages/TransportPage/CreateTransportPages/CreateTransportPage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import CreateEventMasterPage from "../../pages/CreateEventMasterPage/CreateEventMasterPage";

const AppRouter = () => {
    const isLogin = useUserStore(state => state.isLogin);
    const navigate = useNavigate();

    return (
        <Routes>
            {isLogin
                ?
                <Route path='/' element={<Layout/>}>
                    <Route index element={<SynoraEventPage/>}/>
                    <Route path='events' element={<SynoraEventPage/>}/>
                    <Route path='events/:synoraEventId' element={<SynoraEventItemPage/>}/>
                    {/*<Route path='events/new_event' element={<CreateSynoraEventPage/>}/>*/}
                    <Route path='transfers' element={<TransportPage/>}/>
                    <Route path='transfers/new_transfer' element={<CreateTransportPage/>}/>
                    <Route path='templates' element={<TemplatePage/>}/>
                    <Route path='templates/new_template' element={<CreateTemplatePage/>}/>
                    <Route path='events/sendnotification/:currentEventId' element={<SendNotificationPage/>}/>
                    <Route path='events/createeventmaster' element={<CreateEventMasterPage/>}/>
                    <Route path='*' element={<SynoraEventPage/>}/>

                </Route>
                :
                <>
                    <Route index path="*" element={<LoginPage/>}/>
                    <Route path="registration" element={<RegistrationPage/>}/>
                </>
            }
        </Routes>

    );
};

export default AppRouter;