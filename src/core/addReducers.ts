import { TH_INIT_ASYNC_REDUCERS } from "./globalActionTypes";

export default function createAsyncAddReducer(reducers:any,store:any) {
	return function addReducers(namespace:string,newReducer:any) {
		reducers[namespace] = reducers[namespace] || {};
		Object.keys(newReducer).forEach(function (key) {
			reducers[namespace][key] = newReducer[key];
			if(process.env.IS_SERVER !== "server") {
				store.dispatch({
					type:TH_INIT_ASYNC_REDUCERS,
					namespace:namespace
				});
			}
		});
	}
}