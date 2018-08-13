import * as React from 'react'
import './App.css'
import DateComponent from './components/date/index';

class App extends React.Component {
  public render() {
    return (
      <main className="App">
        <DateComponent/>
      </main>
    );
  }
}

export default App
