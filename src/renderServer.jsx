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

function renderFullPage(html, initialState) {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href=/css/app-a4af5cd7.css rel=stylesheet>
    </head>
    <body>
      <div id="app">
        <div>
          ${html}
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script type=text/javascript src=/js/manifest-bc6a156f.js></script><script type=text/javascript src=/js/vendors-159950ce.js></script><script type=text/javascript src=/js/utils-3b1361af.js></script><script type=text/javascript src=/js/core-b945bfa8.js></script><script type=text/javascript src=/js/commons-461af955.js></script><script type=text/javascript src=/js/libs-60b82a2c.js></script><script type=text/javascript src=/js/components-b27bb5e7.js></script><script type=text/javascript src=/js/app-e9f44bf2.js></script></body></body>
    </body>
    </html>
  `;
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