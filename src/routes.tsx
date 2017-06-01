import * as React from 'react';
import {Switch, Router, Route} from 'react-router'
import asyncRoute from "core/asyncRoute"

const Routes = () => (
	<Switch>
		<Route path="/" component={asyncRoute(() => (require as any).ensure([],(require:any)=>require('./containers/Hello/index.tsx').default))} />
		<Route path="/foo" component={asyncRoute(() => (require as any).ensure([],(require:any)=>require('./containers/Hello/index.tsx').default))} />
	</Switch>
);

export default Routes;