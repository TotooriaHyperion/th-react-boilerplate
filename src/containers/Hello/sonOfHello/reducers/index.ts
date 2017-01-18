import * as types from "../actions/index";
import * as globalTypes from "core/globalActionTypes";
import * as Immutable from "immutable";

const initialState = Immutable.fromJS({
	test1:false,
	test2:false,
	count:0
});

export default function (state:any = initialState,action:any) {
	// (window as any).Immutable = Immutable;
	switch(action.type) {
		case globalTypes.TH_INIT_ASYNC_REDUCERS:
			return state || initialState;
		case globalTypes.RESET_DATA:
			return initialState;
		case types.TEST_REDUCER:
			return state.set('test1',!state.get("test1"));
		case types.TEST_REDUCER2:
			return state.set('test2',!state.get("test2"));
		case types.TEST_INCREMENT_COUNT:
			return state.set('count',state.get("count") + 1);
		case types.TEST_DECREMENT_COUNT:
			return state.set('count',state.get("count") - 1);
		default:
			return state;
	}
}