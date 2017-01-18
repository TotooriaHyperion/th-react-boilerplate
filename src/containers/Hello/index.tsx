import * as React from "react";

import "./Hello.scss";

import SubHello from "./sonOfHello";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export default class Hello extends React.Component<HelloProps, undefined> {
	render() {
		return (
			<div>
				<h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
				<SubHello msg="haha" ref="oo" />
			</div>
		);
	}
}