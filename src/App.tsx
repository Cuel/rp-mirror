import * as React from 'react'
import './App.css'
import { DateComponent } from './components/date';
import { ITranslations } from './components/util/Translate';

const locale: keyof ITranslations = 'sv-SE'

class App extends React.Component {
  public render() {
    return (
      <main className="App">
        <DateComponent locale={locale} />
      </main>
    );
  }
}

export default App
