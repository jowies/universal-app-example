import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { Contact } from '../types';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contact.contacts);
  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Mail</th>
        </tr>
        {contacts.map((contact: Contact) => (
          <tr key={contact._id}>
            <th>{contact.name}</th>
            <th>{contact.age}</th>
            <th>{contact.mail}</th>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ContactList;
