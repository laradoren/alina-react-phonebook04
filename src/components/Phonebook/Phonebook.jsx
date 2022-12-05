import React from 'react';
import css from './Phonebook.module.css';
import PropTypes from 'prop-types';
import { Section } from 'components/Section/Section';

export const Phonebook = ({ onAddContact }) => {
  return (
    <Section title={'Phonebook'}>
      <form onSubmit={onAddContact} id="add-contact-form">
        <div className={css.label}>Name</div>
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
        />

        <div className={css.label}>Number</div>
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    </Section>
  );
};

Phonebook.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
