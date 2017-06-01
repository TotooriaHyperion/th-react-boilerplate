import * as React from 'react'
import routes from './routes'
export class App extends React.Component<any,any> {
	constructor(props:any,context:any) {
		super(props);
	}
	render() {
		return routes();
	}
}