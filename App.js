//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { View, Image, TouchableOpacity } from 'react-native';
// import all basic components

//For React Navigation 2.+ import following
//import {DrawerNavigator, StackNavigator} from 'react-navigation';

//For React Navigation 3.+ import following
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import firebase from 'firebase';


import NavigationDrawerStructure from './pages/Menu';
import { Button, Text } from 'react-native-elements';

class App extends React.Component {
  constructor(props) {
    super(props);


  }

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyA3lL6OyQUB9wFfq_vljnBCU9u2Ee_ka5Y",
      authDomain: "reactnativedatabase-e2a50.firebaseapp.com",
      databaseURL: "https://reactnativedatabase-e2a50.firebaseio.com",
      projectId: "reactnativedatabase-e2a50",
      storageBucket: "",
      messagingSenderId: "385603840051"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View><Text>COmenzar</Text>
        <Button onPress={() => this.props.navigation.navigate('Nav')}>Iniciar</Button>

      </View>
    );
  }
}

//For React Navigation 2.+ need to use StackNavigator instead createStackNavigator
//const FirstActivity_StackNavigator = StackNavigator({

//For React Navigation 3.+
const Main_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Home: {
    screen : App,
  },
  Nav: {

    screen: NavigationDrawerStructure,
    navigationOptions: ({ navigation }) => ({
      title: 'Regiones',
      header: null,
    }),
  },

});

//For React Navigation 2.+ need to use StackNavigator instead createStackNavigator
//const FirstActivity_StackNavigator = StackNavigator({


//For React Navigation 2.+ need to use DrawerNavigator instead createDrawerNavigator
//const DrawerNavigatorExample = DrawerNavigator({

//For React Navigation 3.+


//For React Navigation 2.+ need to export App only
//export default DrawerNavigatorExample;
//For React Navigation 3.+
export default createAppContainer(Main_StackNavigator);
