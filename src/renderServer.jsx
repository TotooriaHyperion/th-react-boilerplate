"use strict";
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router, match } from 'react-router';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from "./core/configureStore"

const express = require('express');
const app = express();
const fs = require('fs');
const compress = require('compression');
const path = require("path");

app.use(compress());
// app.use("/",express.static("./dist"));

app.get("/api", function (req, res) {
	res.end(JSON.stringify(req.query));
});

let file = fs.readFileSync(path.resolve(__dirname,'../dist/index.html'),'utf-8');

function renderFullPage(html, initialState) {
	return file.replace(/<div id=html style="display: none"><\/div>/,`<div>${html}</div>`)
		.replace(/<div id=scripts style="display: none"><\/div>/,`<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>`);
}

app.use("/js",express.static(path.resolve(__dirname,"../dist/js")));
app.use("/css",express.static(path.resolve(__dirname,"../dist/css")));
app.use("/thshr",express.static(path.resolve(__dirname,"../dist/thshr")));

app.use((req, res) => {
	match({ routes:Routes(), location: req.url }, (err, redirectLocation, renderProps) => {
		if (err) {
			res.status(500).end(`Internal Server Error ${err}`);
		} else if (redirectLocation) {
			res.redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			let store = configureStore();

			store.dispatch({
				type:'TEST_INCREMENT_COUNT',
				namespace:'Hello.sonOfHello'
			});
			store.dispatch({
				type:'TEST_INCREMENT_COUNT',
				namespace:'Hello.sonOfHello'
			});

			const html = renderToString(
				<Provider store={store}>
					<Router {...renderProps}/>
				</Provider>
			);
			let state = store.getState();
			state.asyncReducer = state.asyncReducer.toJS();

			res.end(renderFullPage(html, state));
		} else {
			res.status(404).end('Not found');
		}
	});
});

app.listen(11345);