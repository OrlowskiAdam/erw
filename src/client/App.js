import React from 'react';
import {hot} from 'react-hot-loader';
import {AppRouter} from './components/AppRouter';

class App extends React.Component {
  render() {
    return <AppRouter />;
  }
}

export default hot(module)(App);
