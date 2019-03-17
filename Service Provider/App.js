import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import store from './store'
import StackNavigation from './Navigation/StackNavigation';
console.disableYellowBox = true

export default class App extends React.Component {
  render() {
    return (
      <Provider store = {store}>
        <StackNavigation />   
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
