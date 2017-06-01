"use strict";
import { compose,createStore } from 'redux';
import { createHashHistory,createBrowserHistory,createMemoryHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware } from 'redux';
import { fromJS } from "immutable";
import * as Immutable from "immutable";
import createActionBinder from "./bindActions";
import createAsyncAddReducer from "./addReducers";

import 'babel-polyfill';
// import saga from 'redux-saga';
import * as promise from 'redux-promise';
import reducerMethod from './rootReducers';

function aMiddleware(_ref:{dispatch:any,getState:Function}) {
	let { dispatch,getState } = _ref;
	return function (next:any) {
		return function (action:any) {
			if(typeof action === 'function') {
				return action(dispatch,getState);
			}
			if(typeof action.then === 'function') {
				return Promise.resolve(action).then(dispatch);
			}
			return next(action);
		}
	}
}

function promiseMiddleware(_ref:{dispatch:any,getState:Function}) {
	let { dispatch,getState } = _ref;
	return function (next:any) {
		return function (action:any) {
			if(typeof action.then === 'function') {
				return Promise.resolve(action).then(dispatch);
			}
			return next(action);
		}
	}
}

declare let window: any;
declare let global: any;

export default function configureStore() {
	let defaultState:any = {};

	if(process.env.IS_SERVER !== "server") {
		defaultState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {};
		let dom = window.document.getElementById("__initial_state__");
		dom && dom.outerHTML && (dom.outerHTML = "");
	}

	// if (defaultState.asyncReducer && !defaultState.asyncReducer.asImmutable) {
	// 	defaultState.asyncReducer = fromJS(defaultState.asyncReducer);
	// }

	if(!defaultState.asImmutable) {
		defaultState = fromJS(defaultState);
	}

	let theHistory:any = createMemoryHistory();

	if(process.env.IS_SERVER !== "server") {
		theHistory = global.history = createBrowserHistory();
	}

	const composeEnhancers =
		process.env.NODE_ENV !== 'production' &&
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

	let middlewares = [aMiddleware,promise];

	if (process.env.IS_SERVER === "server") {
		middlewares = [routerMiddleware(theHistory), ...middlewares];
	}


// if (process.env.NODE_ENV === `development`) {
// 	const createLogger = require(`redux-logger`);
// 	const logger = createLogger();
// 	middlewares.push(logger);
// }

	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
	const store = composeEnhancers()(createStoreWithMiddleware)(reducerMethod.rootReducer,defaultState);

	let reducers = reducerMethod.asyncReducers;

	let prevRoutingState:any = defaultState.get('routing');
	let prevRoutingStateJS:any;

	// const history = process.env.IS_SERVER === "server" ? theHistory : syncHistoryWithStore(theHistory, store, {
	// 	selectLocationState (state:any) {
	// 		const routingState = state.get('routing');
	//
	// 		if (!routingState.equals(prevRoutingState)) {
	// 			prevRoutingState = routingState;
	// 			prevRoutingStateJS = routingState.toJS();
	// 		}
	// 		return prevRoutingStateJS || (routingState && routingState.toJS && routingState.toJS()) || {
	// 				locationBeforeTransitions: null
	// 			};
	// 	}
	// });

	store.bindActions = createActionBinder(store);
	store.history = theHistory;
	store.addReducers = createAsyncAddReducer(reducers,store);

	return store
}