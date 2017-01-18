import * as React from "react";

import connect from "core/ReduxConnector";
import ReduxComponent from "core/ReduxComponent";
// import { ReduxComponent } from "core/index";
import r_index from "./reducers/index";
import a_index from "./actions/index";

const namespace = "Hello.sonOfHello";

@ReduxComponent({
	namespace,
	reducers:{
		r_index
	},
	actions:a_index
})
class Hello extends React.Component<any, any> {
	static defaultProps = {
		count:0,
		test1:false,
		test2:false
	};
	constructor(props:any,context:any) {
		super(props,context)
	}
	render() {
		const { test1,test2,count } = this.props;
		return (
			<div>
				<h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
				<p>
					<button onClick={this.props.actions.doTest1}>Test1</button>
				</p>
				<p>{test1 ? "TRUE" : "FALSE"}</p>
				<p>
					<button onClick={this.props.actions.doTest2}>Test2</button>
				</p>
				<p>{test2 ? "TRUE" : "FALSE"}</p>
				<p>
					<button onClick={this.props.actions.increment}>INCREMENT</button>
				</p>
				<p>
					<button onClick={this.props.actions.decrement}>DECREMENT</button>
				</p>
				<p>{count}</p>
			</div>
		);
	}
}

function theState(state:any) {
	if (!state) {
		return {};
	}
	let _state = state.get(namespace);
	if (!_state) {
		return {};
	}
	return {
		count:_state.get("count"),
		test1:_state.get("test1"),
		test2:_state.get("test2")
	};
}

export default connect(theState)(Hello)