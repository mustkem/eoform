import React, { Component } from 'react';
import './App.css';
import ContactData from './components/ContactData';
import SelectDropdown from './components/SelectDropdown/SelectDropdown';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <h1 className="App-title">Demo Form</h1>
        </header>
        
          <ContactData />
          <SelectDropdown />
       
      </div>
    );
  }
}

export default App;
