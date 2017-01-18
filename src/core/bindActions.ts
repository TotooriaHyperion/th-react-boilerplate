export default function createActionBinder(store:any) {
	return function bindActions(namespace:string,actions:any) {
		let bondActions:any = {};
		Object.keys(actions).forEach(function (key) {
			bondActions[key] = function(param:any) {
				store.dispatch({
					...actions[key](param),
					namespace
				});
			}
		});
		return bondActions;
	}
}