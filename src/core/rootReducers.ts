import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as Immutable from "immutable";
let reducers:any = {};

// (window as any).Immutable = Immutable;

function asyncReducer(state:any = Immutable.fromJS({}),action:any) {
	let { namespace,...restAction } = action;
	let currentReducer = reducers[namespace];
	if (!currentReducer) {
		return state;
	}
	let prev = state.get(namespace);
	let newState = Object.keys(currentReducer).map(function (key) {
		return (currentReducer[key] instanceof Function) && currentReducer[key](prev == null ? undefined : prev,restAction);
	}).reduce(function (prev,curr) {
		return prev.merge(curr);
	},prev || Immutable.Map());
	return Immutable.is(prev, newState) ? state : state.set(namespace,newState);
}

const rootReducer = combineReducers({
	asyncReducer:asyncReducer,
	routing:routerReducer
});

export default {
	rootReducer,
	asyncReducers:reducers,
	// addReducers
}