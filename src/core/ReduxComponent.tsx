import * as React from "react";

export default function ReduxComponent(option:any) {
	let { namespace,reducers,actions } = option;
	return (WrappedComponent:any) => {
		return class RComponent extends React.Component<any,any> {
			static defaultProps:any;
			static propTypes = Object.assign({},WrappedComponent.propTypes,{});
			static contextTypes = Object.assign({},WrappedComponent.contextTypes,{
				store:React.PropTypes.shape({
					subscribe: React.PropTypes.func.isRequired,
					dispatch: React.PropTypes.func.isRequired,
					getState: React.PropTypes.func.isRequired
				})
			});
			static childContextTypes = Object.assign({},WrappedComponent.childContextTypes,{});
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