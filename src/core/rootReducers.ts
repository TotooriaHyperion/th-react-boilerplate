import { combineReducers } from 'redux-immutable';
// import { routerReducer } from 'react-router-redux';
import {
	LOCATION_CHANGE
} from 'react-router-redux';
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

function routing(state:any = Immutable.fromJS({
	locationBeforeTransitions: null
}), action:any)  {
	if (action.type === LOCATION_CHANGE) {
		return state.set('locationBeforeTransitions', action.payload);
	}

	return state;
}

const rootReducer = combineReducers({
	asyncReducer:asyncReducer,
	routing:routing
});

export default {
	rootReducer,
	asyncReducers:reducers,
	// addReducers
}