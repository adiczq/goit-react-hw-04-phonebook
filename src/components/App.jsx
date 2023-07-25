import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const prevContactsRef = useRef([]);
  const prevFilterRef = useRef('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    const storedFilter = localStorage.getItem('filter');

    console.log('Stored Contacts:', storedContacts);
    console.log('Stored Filter:', storedFilter);

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
    if (storedFilter) {
      setFilter(storedFilter);
    }
  }, []);

  useEffect(() => {
    // Porównaj poprzedni stan z aktualnym stanem i wykonaj tylko wtedy zapis do localStorage
    if (
      JSON.stringify(prevContactsRef.current) !== JSON.stringify(contacts) ||
      prevFilterRef.current !== filter
    ) {
      const saveStateToLocalStorage = () => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
        // Sprawdź, czy filter jest niepusty, zanim go zapiszesz w localStorage
        if (filter !== '') {
          localStorage.setItem('filter', filter);
        }

        console.log('Contacts Saved:', contacts);
        console.log('Filter Saved:', filter);
      };
      saveStateToLocalStorage();

      // Zaktualizuj refy po zapisaniu danych do localStorage
      prevContactsRef.current = contacts;
      prevFilterRef.current = filter;
    }
  }, [contacts, filter]);

  const handleAddContact = newContact => {
    const isExistingNumber = contacts.some(
      contact => contact.number === newContact.number
    );

    if (isExistingNumber) {
      alert('Ten numer już istnieje!');
    } else {
      const contactWithId = { ...newContact, id: nanoid() };
      setContacts(prevContacts => [...prevContacts, contactWithId]);
    }
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = newFilter => {
    setFilter(newFilter);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
