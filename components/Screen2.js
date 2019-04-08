
/**
 * React Native todo list with Firebase
 */

import React, { Component } from 'react';
import firebase from './firebase';
import {
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
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
    
    
    //props to contain every region team
    this.state = {
      name: '',
      kanto: [],
      johto: [],
      hoenn: [],
      sinnoh: [],
      unova: [],
      kalos: [],
    };
  }

  keyExtractor = (item) => item.id;

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
      style = {{padding:20}}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={{ uri: 'http://pokestadium.com/sprites/xy/' + item.name + '.gif' }}
        />
        <Text >{item.name}</Text>
      </TouchableOpacity>
    );
  };



  // List reading from database to deploy
  listenForItems(itemsRef, obj) {
    itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          id: child.key,
          name: child.val().name,
        });
      });
      if (obj == 'kanto') {
        this.setState({ kanto: items });
      }
      else if (obj == 'johto') {
        this.setState({ johto: items });
      }
      else if (obj == 'hoenn') {
        this.setState({ hoenn: items });
      }
      else if (obj == 'sinnoh') {
        this.setState({ sinnoh: items });
      }
      else if (obj == 'unova') {
        this.setState({ unova: items });
      }
      else if (obj == 'kalos') {
        this.setState({ kalos: items });
      }

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRefKanto, 'kanto');
    this.listenForItems(this.itemsRefJohto, 'johto');
    this.listenForItems(this.itemsRefHoenn, 'hoenn');
    this.listenForItems(this.itemsRefSinnoh, 'sinnoh');
    this.listenForItems(this.itemsRefUnova, 'unova');
    this.listenForItems(this.itemsRefKalos, 'kalos');
  }
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
  deleteTeam(deleted) {
    firebase.database().ref(deleted).remove();
  }

  render() {
    return (
      <ScrollView>

        {/*Teams deployment  */}

        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20}}>KANTO</Text>

        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.kanto}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />

          {this._renderButton('Delete Team', () => this.deleteTeam('kanto'))}
        </View>


        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20}}>JOHTO</Text>

        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.johto}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
          {this._renderButton('Delete Team', () => this.deleteTeam('johto'))}
        </View>




        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20}}>HOENN</Text>

        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.hoenn}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
          {this._renderButton('Delete Team', () => this.deleteTeam('hoenn'))}
        </View>




        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20}}>SINNOH</Text>

        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.sinnoh}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
          {this._renderButton('Delete Team', () => this.deleteTeam('sinnoh'))}
        </View>


        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20}}>UNOVA</Text>

        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.unova}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
          {this._renderButton('Delete Team', () => this.deleteTeam('unova'))}
        </View>

        <View style={styles.headercontainer}>
          <Text style={{ fontSize: 20}}>KALOS</Text>

        </View>
        <View style={styles.listcontainer}>
          <FlatList
            data={this.state.kalos}
            keyExtractor={this.keyExtractor}
            numColumns={numColumns}
            renderItem={this.renderItem}
            style={{ marginTop: 20 }}

          />
          {this._renderButton('Delete Team', () => this.deleteTeam('kalos'))}
        </View>

      </ScrollView>
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
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
});

