import * as React from "react";

import { fromJS } from "immutable";
import { connect } from "react-redux";
import Tag from "components/Tag";
import { Link } from "react-router";
import ReduxComponent from "core/ReduxComponent";
// import { ReduxComponent } from "core/index";
import r_index from "./reducers/index";
import a_index from "./actions/index";

const namespace = "Hello.sonOfHello";

interface OwnProps {
	msg:string;
}

interface StateProps {
	_state:any;
}

interface DispatchProps {
	actions:any;
}

interface AllProps extends OwnProps,StateProps,DispatchProps {}

function theState(state:any) {
	let asyncState = state.get("asyncReducer");
	let routing = state.get("routing");
	if (!asyncState) {
		return {};
	}
	let _state = asyncState.get(namespace);
	if (!_state) {
		return {};
	}
	return {
		_state
	};
}

@ReduxComponent({
	namespace,
	reducers:{
		r_index
	},
	actions:a_index
})
class Hello extends React.Component<AllProps, undefined> {
	static defaultProps = {
		count:0,
		test1:false,
		test2:false
	};
	static propTypes = {
		msg:React.PropTypes.string
	};
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};
	constructor(props:any,context:any) {
		super(props,context)
	}
	render() {
		let { _state } = this.props;
		_state = _state || fromJS({});
		const { location,param } = this.context.router;
		console.log("render");
		return (
			<div>
				<h1>Hello from {this.props.msg}!</h1>
				<h2>Router is {location.pathname}</h2>
				<p>
					<Link to="/">To /</Link>
				</p>
				<p>
					<Link to="/foo">To /foo</Link>
				</p>
				<p>
					<button onClick={this.props.actions.doTest1}>Test1</button>
				</p>
				<p>{_state.get("test1") ? "TRUE" : "FALSE"}</p>
				<p>
					<button onClick={this.props.actions.doTest2}>Test2</button>
				</p>
				<p>{_state.get("test2") ? "TRUE" : "FALSE"}</p>
				<p>
					<button onClick={this.props.actions.increment}>INCREMENT</button>
				</p>
				<p>
					<button onClick={this.props.actions.decrement}>DECREMENT</button>
				</p>
				<p>{_state.get("count")}</p>

				<div className="flextest">
					{
						[1,2,3,4,5,6].map(function (item,index) {
							return (
								<div className="item" key={index}>{item}</div>
							)
						})
					}
				</div>
				<Tag>I'm Tag</Tag>
			</div>
		);
	}
}

export default connect<any,DispatchProps,OwnProps>(theState)(Hello)
// export default Hello;