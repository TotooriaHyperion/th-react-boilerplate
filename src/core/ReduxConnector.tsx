import * as React from "react";

const defaultMapStateToProps = (state:any) => (state) ;// eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = (dispatch:Function) => ({ dispatch });
const defaultMergeProps = (stateProps:any, dispatchProps:any, parentProps:any) => {
	return ({
		...parentProps,
		...stateProps,
		...dispatchProps
	});
};

function getDisplayName(WrappedComponent:any) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function shallowEqual(prev:any,next:any) {
	if (prev === next) {
		return true
	}
	const keysA = Object.keys(prev);
	const keysB = Object.keys(next);

	if (keysA.length !== keysB.length) {
		return false
	}
	const hasOwn = Object.prototype.hasOwnProperty;
	for (let i = 0; i < keysA.length; i++) {
		if (!hasOwn.call(next, keysA[i]) ||
			prev[keysA[i]] !== next[keysA[i]]) {
			return false
		}
	}
	return true
}

let nextVersion:number = 0;

export default function connect(mapStateToProps?:Function,mapDispatchToProps?:Function,mergeProps?:Function) {
	// const shouldSubscribe = Boolean(mapStateToProps);
	const mapState:Function = mapStateToProps || defaultMapStateToProps;

	let mapDispatch:Function;
	if (typeof mapDispatchToProps === 'function') {
		mapDispatch = mapDispatchToProps
	} else if (!mapDispatchToProps) {
		mapDispatch = defaultMapDispatchToProps
	}

	const finalMergeProps:Function = mergeProps || defaultMergeProps;
	// const { pure = true, withRef = false } = options;
	// const checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;

	// Helps track hot reloading.
	const version:number = nextVersion++;

	return function wrapWithConnect(WrappedComponent:any) {
		const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`;

		function computeMergedProps(stateProps:any, dispatchProps:any, parentProps:any) {
			return finalMergeProps(stateProps, dispatchProps, parentProps);
		}

		class Connect extends React.Component<any,any> {
			// private childContextTypes: any;
			// private contextTypes: any;
			// private defaultProps: any;
			// private getDefaultProps: any;
			// private mixins: any;
			// private propTypes: any;
			// private type: any;
			//
			// private name: any;
			// private length: any;
			// private prototype: any;
			// private caller: any;
			// private arguments: any;
			// private arity: any;

			static contextTypes:any = {
				store:React.PropTypes.shape({
					subscribe: React.PropTypes.func.isRequired,
					dispatch: React.PropTypes.func.isRequired,
					getState: React.PropTypes.func.isRequired
				})
			};

			private displayName = connectDisplayName;
			private version:any;
			private store:any;
			private dispatchProps:any;
			private stateProps:any;
			private mergedProps:any;
			private haveOwnPropsChanged:any;
			private hasStoreStateChanged:any;
			private haveStatePropsBeenPrecalculated:any;
			private statePropsPrecalculationError:any;
			private renderedElement:any;
			private finalMapDispatchToProps:any;
			private finalMapStateToProps:any;

			private doStatePropsDependOnOwnProps:any;
			private doDispatchPropsDependOnOwnProps:any;

			private unsubscribe:Function;

			shouldComponentUpdate() {
				return this.haveOwnPropsChanged || this.hasStoreStateChanged
			}
			constructor(props:any, context:any) {
				super(props, context);
				this.version = version;
				this.store = props.store || context.store;
				const storeState = this.store.getState()["asyncReducer"];
				this.state = { storeState };
				this.clearCache();
			}

			computeStateProps(store:any, props:any):any {
				if (!this.finalMapStateToProps) {
					return this.configureFinalMapState(store, props)
				}

				const state = store.getState()["asyncReducer"];
				return this.doStatePropsDependOnOwnProps ?
					this.finalMapStateToProps(state,store.getState(),  props) :
					this.finalMapStateToProps(state,store.getState(),);
			}

			configureFinalMapState(store:any, props:any):any {
				const mappedState = mapState(store.getState()["asyncReducer"], props);
				const isFactory = typeof mappedState === 'function';

				this.finalMapStateToProps = isFactory ? mappedState : mapState;
				this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

				if (isFactory) {
					return this.computeStateProps(store, props)
				}
				return mappedState
			}

			computeDispatchProps(store:any, props:any):any {
				if (!this.finalMapDispatchToProps) {
					return this.configureFinalMapDispatch(store, props)
				}

				const { dispatch } = store;
				return this.doDispatchPropsDependOnOwnProps ?
					this.finalMapDispatchToProps(dispatch, props) :
					this.finalMapDispatchToProps(dispatch)
			}

			configureFinalMapDispatch(store:any, props:any):any {
				const mappedDispatch = mapDispatch(store.dispatch, props);
				const isFactory = typeof mappedDispatch === 'function';

				this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
				this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

				if (isFactory) {
					return this.computeDispatchProps(store, props)
				}
				return mappedDispatch
			}

			updateStatePropsIfNeeded() {
				const nextStateProps = this.computeStateProps(this.store, this.props);
				if (this.stateProps && shallowEqual(nextStateProps, this.stateProps)) {
					return false
				}
				// if (this.stateProps && nextStateProps.equals(this.stateProps)) {
				// 	return false
				// }
				this.stateProps = nextStateProps;
				return true
			}

			updateDispatchPropsIfNeeded() {
				const nextDispatchProps = this.computeDispatchProps(this.store, this.props);
				if (this.dispatchProps && shallowEqual(nextDispatchProps, this.dispatchProps)) {
					return false
				}

				this.dispatchProps = nextDispatchProps;
				return true
			}

			updateMergedPropsIfNeeded() {
				const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
				if (this.mergedProps && shallowEqual(nextMergedProps, this.mergedProps)) {
					return false
				}

				this.mergedProps = nextMergedProps;
				return true
			}

			trySubscribe() {
				if (!this.unsubscribe) {
					this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
					this.handleChange()
				}
			}

			tryUnsubscribe() {
				if (this.unsubscribe) {
					this.unsubscribe();
					this.unsubscribe = null
				}
			}

			componentDidMount() {
				this.trySubscribe()
			}

			componentWillReceiveProps(nextProps:any) {
				this.haveOwnPropsChanged = !shallowEqual(nextProps, this.props);
			}

			componentWillUnmount() {
				this.tryUnsubscribe();
				this.clearCache()
			}

			clearCache() {
				this.dispatchProps = null;
				this.stateProps = null;
				this.mergedProps = null;
				this.haveOwnPropsChanged = true;
				this.hasStoreStateChanged = true;
				this.haveStatePropsBeenPrecalculated = false;
				this.statePropsPrecalculationError = null;
				this.renderedElement = null;
				this.finalMapDispatchToProps = null;
				this.finalMapStateToProps = null;
			}
			handleChange() {
				if (!this.unsubscribe) {
					return
				}
				const storeState = this.store.getState()["asyncReducer"];
				const prevStoreState = this.state.storeState;
				if (prevStoreState && storeState && (prevStoreState === storeState)) {
					return
				}
				this.hasStoreStateChanged = true;
				this.setState({ storeState });
			}
			render() {
				const {
					haveOwnPropsChanged,
					hasStoreStateChanged,
					haveStatePropsBeenPrecalculated,
					statePropsPrecalculationError,
					renderedElement
				} = this;

				this.haveOwnPropsChanged = false;
				this.hasStoreStateChanged = false;
				this.haveStatePropsBeenPrecalculated = false;
				this.statePropsPrecalculationError = null;

				if (statePropsPrecalculationError) {
					throw statePropsPrecalculationError
				}

				let shouldUpdateStateProps = true;
				let shouldUpdateDispatchProps = true;
				if (renderedElement) {
					shouldUpdateStateProps = hasStoreStateChanged || (
							haveOwnPropsChanged && this.doStatePropsDependOnOwnProps
						);
					shouldUpdateDispatchProps =
						haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps
				}

				let haveStatePropsChanged = false;
				let haveDispatchPropsChanged = false;
				if (haveStatePropsBeenPrecalculated) {
					haveStatePropsChanged = true
				} else if (shouldUpdateStateProps) {
					haveStatePropsChanged = this.updateStatePropsIfNeeded()
				}
				if (shouldUpdateDispatchProps) {
					haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded()
				}

				let haveMergedPropsChanged = true;
				if (
					haveStatePropsChanged ||
					haveDispatchPropsChanged ||
					haveOwnPropsChanged
				) {
					haveMergedPropsChanged = this.updateMergedPropsIfNeeded()
				} else {
					haveMergedPropsChanged = false
				}

				if (!haveMergedPropsChanged && renderedElement) {
					return renderedElement
				}

				this.renderedElement = React.createElement(WrappedComponent, {
					...this.mergedProps,
					ref: 'wrappedInstance'
				});

				return this.renderedElement
			}
		}

		// let REACT_STATICS:any = {
		// 	childContextTypes: true,
		// 	contextTypes: true,
		// 	defaultProps: true,
		// 	displayName: true,
		// 	getDefaultProps: true,
		// 	mixins: true,
		// 	propTypes: true,
		// 	type: true
		// };
		//
		// let KNOWN_STATICS:any = {
		// 	name: true,
		// 	length: true,
		// 	prototype: true,
		// 	caller: true,
		// 	arguments: true,
		// 	arity: true
		// };
		//
		// if (typeof WrappedComponent !== 'string') { // don't hoist over string (html) components
		// 	let keys = Object.getOwnPropertyNames(WrappedComponent);
		// 	for (let i = 0; i < keys.length; ++i) {
		// 		if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
		// 			try {
		// 				Connect[keys[i]] = WrappedComponent[keys[i]];
		// 			} catch (error) {
		//
		// 			}
		// 		}
		// 	}
		// }

		return Connect;
		// return hoistStatics(Connect,WrappedComponent);
	}
}