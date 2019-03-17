import React, { Component } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer} from 'react-navigation';

import SideMenu from './SideMenu/sideMenu'
import stackNav from './app/stacknav';

const drawernav = createDrawerNavigator({
  Item1: {
      screen: stackNav,
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,  
});


AppRegistry.registerComponent('Demo', () => drawernav);

const MyApp = createAppContainer(drawernav);

export default MyApp