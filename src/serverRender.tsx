import * as React from 'react'
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux'
import { App } from './app'
import  store  from "core/"

import "feature.js";
import "style/main.scss";

export default renderToString(
	<Provider  store={store}>
		<App />
	</Provider>
);