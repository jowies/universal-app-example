import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';

export interface IContactState {
  contacts: Contact[];
}

const initialState: IContactState = {
  contacts: [],
};

const contact = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact | Contact[]>) => {
      const { payload } = action;
      state.contacts.push(...(Array.isArray(payload) ? payload : [payload]));
    },
  },
});

export const { addContact } = contact.actions;
export default contact.reducer;
