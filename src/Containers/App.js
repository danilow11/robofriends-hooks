import React from 'react';
import CardList from '../Components/CardList';
import Searchbox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { robots, searchfield } = this.state;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    });

    return !robots.length ?
      <h1>Loading...</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>Robofriends</h1>
          <Searchbox searchChange={this.onSearchChange}/>
          <ErrorBoundry>
            <Scroll>
              <CardList robots={filteredRobots}/>
            </Scroll>
          </ErrorBoundry>
        </div>
      );
  }
}

export default App;
