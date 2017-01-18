"use strict";
import { compose,createStore } from 'redux';
import { hashHistory,browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { applyMiddleware } from 'redux';
import { fromJS } from "immutable";
import createActionBinder from "./bindActions";
import createAsyncAddReducer from "./addReucers";

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
	}

	if (defaultState.asyncReducer && !defaultState.asyncReducer.asImmutable) {
		defaultState.asyncReducer = fromJS(defaultState.asyncReducer);
	}


	const composeEnhancers =
		process.env.NODE_ENV !== 'production' &&
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

	let middlewares = [aMiddleware,promise];

// if (process.env.NODE_ENV === `development`) {
// 	const createLogger = require(`redux-logger`);
// 	const logger = createLogger();
// 	middlewares.push(logger);
// }

	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
	const store = composeEnhancers()(createStoreWithMiddleware)(reducerMethod.rootReducer,defaultState);

	let theHistory = process.env.ROUTE_HISTORY === 'hash' ? hashHistory : browserHistory;

	if(process.env.IS_SERVER === "server") {
		theHistory = global.history = browserHistory;
	}

	let reducers = reducerMethod.asyncReducers;



	const history = process.env.IS_SERVER === "server" ? theHistory : syncHistoryWithStore(theHistory, store);

	store.bindActions = createActionBinder(store);
	store.history = history;
	store.addReducers = createAsyncAddReducer(reducers,store);

	return store
}