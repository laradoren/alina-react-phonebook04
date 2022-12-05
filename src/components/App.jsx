import React, { useEffect, useState } from 'react';
import { Notification } from './Notification/Notification';
import { nanoid } from 'nanoid';
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let storageContacts = localStorage.getItem('contacts');
    let parsedContacts = JSON.parse(storageContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    let filteredContacts = contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredContacts(filteredContacts);
  }, [filter, contacts]);

  const onAddContact = opt => {
    opt.preventDefault();
    let formData = new FormData(opt.target);
    let name = formData.get('name');
    let number = formData.get('number');

    let isNameAlreadyExist = contacts.filter(item => item.name === name).length;
    if (isNameAlreadyExist) {
      alert(name + ' is already in contacts');
    } else {
      let newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts([...contacts, newContact]);
      localStorage.setItem(
        'contacts',
        JSON.stringify([...contacts, newContact])
      );
      document.getElementById('add-contact-form').reset();
    }
  };

  const onFilterContacts = opt => {
    setFilter(opt.target.value);
  };

  const onDeleteContact = id => {
    let newContacts = contacts.filter(item => item.id !== id);
    setContacts([...newContacts]);
    localStorage.setItem('contacts', JSON.stringify([...newContacts]));
  };

  return (
    <div>
      <Phonebook onAddContact={onAddContact} />
      <Filter filter={filter} onFilterContacts={onFilterContacts} />
      {contacts.length ? (
        <Contacts
          contacts={filteredContacts}
          onDeleteContact={onDeleteContact}
        />
      ) : (
        <Notification message="There is no contacts" />
      )}
    </div>
  );
};
