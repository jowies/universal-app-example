import React, { FC, FormEvent, useState } from 'react';
import axios from 'axios';
import { Contact, contactSchema } from '../types';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/contactSlice';

interface Error {
  active: boolean;
  message: string;
}

export interface FormState {
  contact: Contact;
  error: Error;
}
export const initialState: FormState = {
  contact: { name: '', age: 0, mail: '' },
  error: {
    active: false,
    message: '',
  },
};

const Form: FC = () => {
  //State
  const [state, setState] = useState(initialState.contact);
  const [error, setError] = useState(initialState.error);
  const dispatch = useDispatch();

  //Creates a changeHandler
  const createChangerHandler = (input: string, number: boolean) => {
    return (e: FormEvent<HTMLInputElement>) => {
      const newValue = number ? parseInt(e.currentTarget.value) : e.currentTarget.value;
      const newContact = { ...state, ...{ [input]: newValue } };
      const validate = contactSchema.safeParse(newContact);
      if (validate.success) {
        setState(newContact);
        setError(initialState.error);
      } else {
        setState(newContact);
        setError({
          active: true,
          message: validate.error.errors[0].message,
        });
      }
    };
  };

  //On submit
  const onSubmit = async () => {
    if (contactSchema.safeParse(state).success) {
      const res = await axios.post<Contact>('/api/contacts', state).then((res) => res.data);

      const validate = contactSchema.safeParse(res);
      if (validate.success) {
        dispatch(addContact(validate.data));
        setState(initialState.contact);
        setError(initialState.error);
      } else {
        setError({
          active: true,
          message: validate.error.errors[0].message,
        });
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void onSubmit();
      }}
    >
      <input
        onChange={createChangerHandler('name', false)}
        placeholder="name"
        type="text"
        value={state.name}
      ></input>
      <input
        onChange={createChangerHandler('age', true)}
        placeholder="age"
        type="number"
        value={state.age}
      ></input>
      <input
        onChange={createChangerHandler('mail', false)}
        placeholder="email"
        type="email"
        value={state.mail}
      ></input>
      {error.active ? <p>{error.message}</p> : null}
      <input disabled={error.active} type="submit" value="Submit" />
    </form>
  );
};

export default Form;
