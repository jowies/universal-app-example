import React from 'react';
import { Provider } from 'react-redux';
import ContactList from './components/ContactList';
import Form from './components/Form';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ContactList></ContactList>
      <Form></Form>
    </Provider>
  );
};

export default App;
