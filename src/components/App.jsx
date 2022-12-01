import React from "react"
import { Notification } from "./Notification/Notification";
import { nanoid } from 'nanoid'
import { Phonebook } from "./Phonebook/Phonebook";
import { Contacts } from "./Contacts/Contacts";
import { Filter } from "./Filter/Filter";

let defaulContacts = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'}, {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'}, {id: 'id-3', name: 'Eden Clements', number: '645-17-79'}, {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
]
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [...defaulContacts],
      filteredContacts: [...defaulContacts],
      name: '',
      number: '',
      filter: ''
     };
    this.onAddContact = this.onAddContact.bind(this);
    this.onChangeFiled = this.onChangeFiled.bind(this);
    this.onFilterContacts = this.onFilterContacts.bind(this);
    this.onDeleteContact = this.onDeleteContact.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let filteredContacts = this.state.contacts.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase()));
    if(prevState.filteredContacts.length !== filteredContacts.length) {
      this.setState({
        filteredContacts: filteredContacts
      });
    }
  }

  onAddContact() {
    let isNameAlreadyExist = this.state.contacts.filter(item => item.name === this.state.name).length;
    if(isNameAlreadyExist) {
      alert(this.state.name + " is already in contacts");
    } else {
      let newContact = {
        id: nanoid(),
        name: this.state.name,
        number: this.state.number
      }
      this.setState({
        contacts: [...this.state.contacts, newContact],
        name: "",
        number: ""
      });
    }
  }

  onChangeFiled(opt) {
    this.setState({
      [opt.target.name]: opt.target.value
    });
  }

  onFilterContacts(opt) {
    this.setState({
      filter: opt.target.value
    });
  }

  onDeleteContact(id) {
    let newContacts = this.state.contacts.filter(item => item.id !== id);
    this.setState({
      contacts: [...newContacts]
    });
  }

  render () {
  return (
    <div>
      <Phonebook name={this.state.name} number={this.state.number} onAddContact={this.onAddContact} onChangeFiled={this.onChangeFiled} />
      <Filter filter={this.state.filter} onFilterContacts={this.onFilterContacts} />
      {this.state.contacts.length ? <Contacts
        contacts={this.state.filteredContacts}
        onDeleteContact={this.onDeleteContact}
        /> : <Notification message="There is no contacts" />}
    </div>
  );
  }
};
