import * as React from 'react'
import './App.css'
import { DateComponent } from './components/date';
import { ITranslations } from './util/Translate';
import { FeedComponent } from './components/feed/FeedComponent';

const locale: keyof ITranslations = 'sv-SE'

class App extends React.Component {
  render() {
    return (
      <main className="App">
        <DateComponent locale={locale} />
        <FeedComponent locale={locale} />
      </main>
    );
  }
}

export default App
