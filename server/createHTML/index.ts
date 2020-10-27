import App from '../../imports/App';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { ParameterizedContext } from 'koa';
import serialize from 'serialize-javascript';
import { MongoContext } from '../types';
import store from '../../imports/store';
import { initializeReduxState } from './initalizeRedux';

export const initialLoad = async (
  ctx: ParameterizedContext<unknown> & MongoContext,
): Promise<void> => {
  try {
    //Initializes redux state
    const initialState = await initializeReduxState(ctx);

    store.dispatch({ type: 'REPLACE_STATE', payload: initialState });

    const component = ReactDOMServer.renderToString(React.createElement(App, null));

    const html = `
    <!doctype html>
      <html>
      <head>
      <style>
        table, td, th { border: 1px solid black; }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th {
          height: 50px;
        }
      </style>
      </head>
      <body>
      <div id="root">${component}</div>
      <script>
        window.__INITIAL_STATE__= ${serialize(initialState)}
      </script>
      <script src="http://localhost:8080/bundle.js"></script>
    </body>
    </html>`;

    store.dispatch({ type: 'RESET' });
    ctx.body = html;
    ctx.status = 200;
  } catch {
    ctx.body = 'Internal server error';
    ctx.status = 503;
  }
};
