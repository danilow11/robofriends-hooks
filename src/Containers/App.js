import React, { useState, useEffect } from 'react';
import CardList from '../Components/CardList';
import Searchbox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
import './App.css';

function App () {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users));
  }, []);

  const onSearchChange = event => {
    setSearchfield(event.target.value);
  }

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase())
  });

  return !robots.length ?
    <h1>Loading...</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>Robofriends</h1>
        <Searchbox searchChange={onSearchChange}/>
        <ErrorBoundry>
          <Scroll>
            <CardList robots={filteredRobots}/>
          </Scroll>
        </ErrorBoundry>
      </div>
    );
}

export default App;
