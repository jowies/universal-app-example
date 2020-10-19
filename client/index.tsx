import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from '../imports/App';

ReactDOM.hydrate(<App runtime="frontend" />, document.getElementById('root'));
