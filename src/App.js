import React, { Component } from 'react';
import './App.css';
import ContactData from './components/ContactData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <h1 className="App-title">Demo Form</h1>
        </header>
        
          <ContactData />
       
      </div>
    );
  }
}

export default App;
