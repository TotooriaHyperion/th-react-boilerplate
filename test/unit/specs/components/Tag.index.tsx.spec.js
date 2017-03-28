import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from 'react-addons-test-utils';
import SonOfhelloIndex from 'components/Tag/index.tsx';
import { Link } from "react-router";

describe('components/Tag/index.tsx', () => {
	it('should render correct contents', () => {
		const renderer = ReactTestUtils.createRenderer();
		renderer.render(<SonOfhelloIndex />);
		const result = renderer.getRenderOutput();
		expect(result.props.children[2].props.children).to.equal([
			<p>
				<Link to="/">To /</Link>
			</p>
		]);
	})
});
