import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { App } from './app'
import  store  from "core/"

import "feature.js";
import "style/index.scss";

ReactDOM.render((
	<Provider  store={store}>
		<App history={store.history} />
	</Provider>
), document.getElementById('app'));