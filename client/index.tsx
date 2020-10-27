/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../imports/App';
import store from '../imports/store';
import { RootState } from '../imports/store/reducer';

declare global {
  interface Window {
    __INITIAL_STATE__: RootState;
  }
}

const initalState = window.__INITIAL_STATE__;

store.dispatch({ type: 'REPLACE_STATE', payload: initalState });

ReactDOM.hydrate(<App />, document.getElementById('root'));
