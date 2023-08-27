import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/homepage/HomePage";
import EventsPage from "../../pages/eventspage/EventsPage";
import EventPage from "../../pages/eventspage/EventPage";
import TransfersPage from "../../pages/transferspage/TransfersPage";
import CreateTransferPage from "../../pages/transferspage/CreateTransferPage";
import NotFoundPage from "../../pages/notfoundpage/NotFoundPage";

const AppRouter = () => {
    return (
            <Routes>
                <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>} />
                <Route path='events' element={<EventsPage/>} />
                <Route path='events/new_event' element={<EventPage />}/>
                <Route path='transfers' element={<TransfersPage />}/>
                <Route path='transfers/new_transfer' element={<CreateTransferPage />}/>
                <Route path='*' element={<NotFoundPage/>} />
                </Route>
            </Routes>

    );
};

export default AppRouter;