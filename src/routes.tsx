import * as React from 'react';
import { Route } from 'react-router';

const Routes = () => (
	<div>
		<Route path="/" getComponent={(nextState,cb) => (require as any).ensure([],(require:any)=>{
					cb(null,require('./containers/Hello/index.tsx').default)
				})} />
		<Route path="/foo" getComponent={(nextState,cb) => (require as any).ensure([],(require:any)=>{
					cb(null,require('./containers/Hello/index.tsx').default)
				})} />
	</div>
);

export default Routes;