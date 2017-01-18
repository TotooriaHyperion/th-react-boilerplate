import * as React from 'react';
import { Route } from 'react-router';

const Routes = () => (
	<Route path="/" getComponent={(nextState,cb) => (require as any).ensure([],(require:any)=>{
					cb(null,require('./containers/Hello/index.tsx').default)
				})} />
);

export default Routes;