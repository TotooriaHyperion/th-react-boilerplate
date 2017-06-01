import * as React from "react";
import * as PropTypes from 'prop-types'

export default function ReduxComponent(option:any) {
	let { namespace,reducers,actions } = option;
	return (WrappedComponent:any) => {
		return class RComponent extends React.Component<any,any> {
			static defaultProps:any;
			static propTypes = Object.assign({},WrappedComponent.propTypes,{});
			static contextTypes = Object.assign({},WrappedComponent.contextTypes,{
				store:PropTypes.shape({
					subscribe: PropTypes.func.isRequired,
					dispatch: PropTypes.func.isRequired,
					getState: PropTypes.func.isRequired
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