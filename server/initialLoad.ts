import App from '../imports/App';
import ReactDOMServer from "react-dom/server";
import React from 'react';
import { ParameterizedContext } from 'koa';

export const initialLoad = (ctx: ParameterizedContext<any>) => {
    const component = ReactDOMServer.renderToString(
      React.createElement(App, {runtime: 'backend'}, null)
    );
  
    const html = `
    <!doctype html>
      <html>
      <head>
      </head>
      <body>
      <div id="root">${component}</div>
      <script src="http://localhost:8080/bundle.js"></script>
    </body>
    </html>`;
  
    ctx.body = html;
    ctx.status = 200;
  }
