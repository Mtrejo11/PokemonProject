import React, { Component } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';



import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import PokeList from './pokeList';

class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };


  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../image/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//Setting up navigator stacks

const FirstActivity_StackNavigator = createStackNavigator({

  First: {

    screen: Screen1,
    navigationOptions: ({ navigation }) => ({
      title: 'Regions',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
  PokeList: {
    screen: PokeList,
    navigationOptions: ({ navigation }) => ({
      title: 'Regional Pokemon',


    }),
  },
});

const Screen2_StackNavigator = createStackNavigator({
  Second: {
    screen: Screen2,
    navigationOptions: ({ navigation }) => ({
      title: 'Your Teams',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});


const Screen3_StackNavigator = createStackNavigator({
  Third: {
    screen: Screen3,
    navigationOptions: ({ navigation }) => ({
      title: 'Exit',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Creation Drawer Navigator
const DrawerNavigatorExample = createDrawerNavigator({
  Screen1: {
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Pokemon Regions',
    },
  },

  Screen2: {
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'My Teams',
    },
  },

  Screen3: {
    screen: Screen3_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Exit',
    },
  },
});


export default createAppContainer(DrawerNavigatorExample);
