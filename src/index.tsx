import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import './index.scss';
import App from "./App";
import {ThemeProvider} from "@mui/material";
import {synoraTheme} from "./themes";


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
		<BrowserRouter>
			<ThemeProvider theme={synoraTheme}>
				<App />
			</ThemeProvider>
		</BrowserRouter>
);