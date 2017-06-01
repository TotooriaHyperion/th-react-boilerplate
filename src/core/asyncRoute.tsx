import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/observable/zip'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'

const moduleDefaultExport:any = (module:any) => module.default || module

function esModule(module:any, forceArray:any) {
	if (Array.isArray(module)) {
		return module.map(moduleDefaultExport)
	}

	const defualted = moduleDefaultExport(module)
	return forceArray ? [defualted] : defualted
}

export default function asyncRoute(getComponent:Function) {
	return class AsyncRoute extends React.Component<any,any> {
		static contextTypes = {
			store: PropTypes.shape({
				dispatch: PropTypes.func.isRequired
			})
		}

		static Component:React.Component<any,any> = null

		_componentWillUnmountSubject: Subject<any>;
		_mounted: boolean;

		state = {
			Component: AsyncRoute.Component
		}

		componentWillMount() {
			const { Component } = this.state

			if (!Component) {
				this._componentWillUnmountSubject = new Subject()

				const streams = [
					Component
						? Observable.of(Component)
						.takeUntil(this._componentWillUnmountSubject)
						: Observable.fromPromise(getComponent())
						.map(esModule)
						.map(Component => {
							AsyncRoute.Component = Component
							return Component
						})
						.takeUntil(this._componentWillUnmountSubject)
				]

				Observable.zip(...streams)
					.takeUntil(this._componentWillUnmountSubject)
					.subscribe(([Component]) => {
						if (this._mounted) {
							this.setState({Component})
						} else {
							this.state.Component = Component
						}

						this._componentWillUnmountSubject.unsubscribe()
					})
			}
		}

		componentDidMount() {
			this._mounted = true
		}

		componentWillUnmount() {
			if (this._componentWillUnmountSubject && !this._componentWillUnmountSubject.closed) {
				this._componentWillUnmountSubject.next()
				this._componentWillUnmountSubject.unsubscribe()
			}
		}

		render() {
			const Component:any = this.state.Component
			return Component ? <Component {...this.props} /> : null
		}
	}
}