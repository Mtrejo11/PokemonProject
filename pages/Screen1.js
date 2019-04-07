import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';

export default class ButtonBasics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idRegion: 'kanto',
    }
  }


  _onPressButton() {
    //Alert.alert('You tapped the button!')
    //() => this.props.navigation.navigate('PokeList')
  }

  pickRegion(id){
    //Alert.alert('You tapped the button!')
    //this.setState({idRegion : id})
   // alert(id)
    this.props.navigation.navigate('PokeList',{idRegion : id})
    //this.state.idRegion = 
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.buttonContainer}>
          <Button
            
            onPress={() => this.pickRegion("kanto")} 
            title="kanto"
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.pickRegion("johto")}
            title="johto"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.pickRegion("hoenn")}
            title="hoenn"
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.pickRegion("sinnoh")}
            title="sinnoh"
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.pickRegion("unova")}
            title="unova"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.pickRegion("kalos")}
            title="kalos"
            color="#841584"
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => ButtonBasics);
