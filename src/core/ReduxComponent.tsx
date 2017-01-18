import * as React from "react";

export default function ReduxComponent(option:any) {
	let { namespace,reducers,actions } = option;
	return (WrappedComponent:any) => {
		return class RComponent extends React.Component<any,any> {
			static contextTypes = {
				store:React.PropTypes.shape({
					subscribe: React.PropTypes.func.isRequired,
					dispatch: React.PropTypes.func.isRequired,
					getState: React.PropTypes.func.isRequired
				})
			};
			static defaultProps:any;
			constructor(props:any,context:any) {
				super(props,context);
				context.store.addReducers(namespace,reducers);
			}
			render() {
				let bondActions = this.context.store.bindActions(namespace,actions);
				const newProps = {
					...this.props,
					actions:bondActions
				};
				return <WrappedComponent {...newProps} />
			}
		}
	}
}