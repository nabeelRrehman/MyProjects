import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "../../Screens/drawerNav/DrawerNav";
import DetailScreen from "../../Screens/DetailScreen/DetailScreen";

const Draw = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Main",
      headerLeft: (<TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
        <IOSIcon name="ios-menu" size={30} />
      </TouchableOpacity>
      ),
      headerStyle: { paddingRight: 10, paddingLeft: 15 }
    })
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Detail",
    })
  }
});

const stackNav = createAppContainer(Draw)

export default stackNav;