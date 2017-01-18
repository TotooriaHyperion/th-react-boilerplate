import * as React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import routes from "./routes";

export class App extends React.Component<any,any> {
	constructor(props:any,context:any) {
		super(props);
	}
	render() {
		return (
			<Router history={this.props.history}>
				{routes()}
			</Router>
		);
	}
}