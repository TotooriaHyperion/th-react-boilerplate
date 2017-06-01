import * as React from "react";
import * as classnames from "classnames";

import "./style.scss";

export default class Tag extends React.Component<any, any> {
	render() {
		const { className } = this.props;
		const cls = classnames(className,"th-tag");
		return (
			<div className={cls}>
				<span>
					{this.props.children}
				</span>
			</div>
		)
	}
}