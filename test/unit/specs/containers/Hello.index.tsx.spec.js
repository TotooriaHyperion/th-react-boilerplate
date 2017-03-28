import * as React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from 'react-addons-test-utils';
import HelloIndex from 'containers/Hello/index.tsx';

describe('containers/Hello/index.tsx', () => {
	it('should render correct contents', () => {
		const renderer = ReactTestUtils.createRenderer();
		renderer.render(<HelloIndex />);
		const result = renderer.getRenderOutput();
		expect(result.type).to.equal("div");
		expect(result.props.children[0].type).to.equal("h1");
	})
});
