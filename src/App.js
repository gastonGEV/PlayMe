import React, { Component } from 'react';
import { Container } from 'reactstrap';
//components
import Nav from './components/Nav';
import SearchBar from './components/SearchBar';
//style
import './css/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Container>
          <SearchBar />
        </Container>
      </div>
    );
  }
}

export default App;