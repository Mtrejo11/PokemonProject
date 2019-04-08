
import React, { Component } from 'react';

import { View, StyleSheet, ImageBackground } from 'react-native';

import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';



import NavigationDrawerStructure from './components/Menu';
import { Button, Text } from 'react-native-elements';

class App extends React.Component {
  constructor(props) {
    super(props);


  }


  render() {
    return (


      <ImageBackground source={{uri:'https://www.desktopbackground.org/p/2014/07/01/786840_original-151-pokemon-phone-wallpapers-imgur_640x1136_h.jpg'}} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container} >
          <Text style={styles.title}>Regional Pokemon Selector</Text>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.buttonContainer}
              title="Start"
              onPress={() => this.props.navigation.navigate('Nav')}
            />

          </View>


        </View>
      </ImageBackground>

    );
  }
}

//Main navigation controller 
// Navigation Drawer Setup

const Main_StackNavigator = createStackNavigator({

  Home: {
    screen: App,
    navigationOptions: ({ navigation }) => ({

      header: null,
    }),
  },


  Nav: {

    screen: NavigationDrawerStructure,
    navigationOptions: ({ navigation }) => ({
      title: 'Regions',
      header: null,
    }),
  },

});

const styles = StyleSheet.create({
  container: {
 

    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 70,
  },
  buttonContainer: {
    margin: 20,
    width: 100,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  alternativeLayoutButtonContainer: {
    marginLeft: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: '#FFFF',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 200,
    marginTop:50,
  }
});
export default createAppContainer(Main_StackNavigator);
