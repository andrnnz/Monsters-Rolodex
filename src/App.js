import { Component } from 'react';

import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => {
        this.setState(() => {
          return { monsters: users };
        });
      });
  }


  onSearchChange = (event) => {
    console.log(event.target.value);
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
      return { searchField };
    })
  }

    render(){

      const {monsters, searchField} = this.state; // destructuring
      const  {onSearchChange} = this; // destructuring

      const filteredMonsters = monsters.filter((monster) => {
        return monster.name.toLowerCase().includes(searchField);
      });

    return (
      <div className="App">
        <SearchBox 
          onChangeHandler={onSearchChange} 
          placeholder='Search Monsters'
          className='search-box'
          />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
