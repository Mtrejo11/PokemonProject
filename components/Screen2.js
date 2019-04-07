
/**
 * React Native todo list with Firebase
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,

  FlatList,
  View,
  TouchableOpacity, Image
} from 'react-native';

const numColumns = 3;
export default class nativefirebase extends Component {

  constructor(props) {
    super(props);
    //realtime listener for firebase db
    this.itemsRefKanto = firebase.database().ref('kanto');
    this.itemsRefJohto = firebase.database().ref('johto');
    this.itemsRefHoenn = firebase.database().ref('hoenn');
    this.itemsRefSinnoh = firebase.database().ref('sinnoh');
    this.itemsRefUnova = firebase.database().ref('unova');
    this.itemsRefKalos = firebase.database().ref('kalos');
    this.state = { 
      name: '', 
      kanto: [],
      johto:[],
      hoenn: [],
      sinnoh: [],
      unova: [],
      kalos:[],
      modalVisible: false, 
    };
  }

  keyExtractor = (item) => item.id;

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
      //style={styles.item}
      //onPress = {this.changeElement(item)}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={{ uri: 'http://pokestadium.com/sprites/xy/' + item.name + '.gif' }}
        />
        <Text >{item.name}</Text>
      </TouchableOpacity>
    );
  };



  // List todos
  listenForItems(itemsRef,obj) {
    itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          id: child.key,
          name: child.val().name,
          //date: child.val().date,
        });
      });
      if(obj == 'kanto'){
        this.setState({ kanto: items });
      }
      else if(obj == 'johto'){
        this.setState({ johto: items });
      }
      else if(obj == 'hoenn'){
        this.setState({ hoenn: items });
      }
      else if(obj == 'sinnoh'){
        this.setState({ sinnoh: items });
      }
      else if(obj == 'unova'){
        this.setState({ unova: items });
      }
      else if(obj == 'kalos'){
        this.setState({ kalos: items });
      }

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRefKanto, 'kanto');
    this.listenForItems(this.itemsRefJohto,'johto');
    this.listenForItems(this.itemsRefHoenn,'hoenn');
    this.listenForItems(this.itemsRefSinnoh,'sinnoh');
    this.listenForItems(this.itemsRefUnova,'unova');
    this.listenForItems(this.itemsRefKalos,'kalos');
  }



  render() {
    return (
      <View style={styles.maincontainer}>

        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20, marginRight: 40 }}>KANTO</Text>
          
        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.kanto}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
        </View>


        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20, marginRight: 40 }}>JOHTO</Text>
          
        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.johto}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
        </View>




        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20, marginRight: 40 }}>HOENN</Text>
          
        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.hoenn}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
        </View>




        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20, marginRight: 40 }}>SINNOH</Text>
          
        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.sinnoh}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
        </View>


        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20, marginRight: 40 }}>UNOVA</Text>
          
        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.unova}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
        </View>

        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20, marginRight: 40 }}>KALOS</Text>
          
        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.kalos}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headercontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listcontainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

AppRegistry.registerComponent('nativefirebase', () => nativefirebase);
