import React from 'react';
import { FlatList, Dimensions, Text, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modal';
import firebase from 'firebase';

const numColumns = 3;
var array = ['a', 'b', 'c'];
export default class Teams extends React.Component {
  constructor(props) {

    super(props);
    var dataSource1,dataSource2,dataSource3,dataSource4,dataSource5,dataSource6;
    firebase.database().ref('kanto').on('value', (data) => {
      dataSource=data.toJSON();
      console.log(dataSource1);
    })
    firebase.database().ref('johto').on('value', (data) => {
      dataSource=data.toJSON();
      console.log(dataSource2);
    })
    firebase.database().ref('hoenn').on('value', (data) => {
      dataSource=data.toJSON();
      console.log(dataSource3);
    })
    firebase.database().ref('sinnoh').on('value', (data) => {
      dataSource=data.toJSON();
      console.log(dataSource4);
    })
    firebase.database().ref('unova').on('value', (data) => {
      dataSource=data.toJSON();
      console.log(dataSource5);
    })
    firebase.database().ref('kalos').on('value', (data) => {
      dataSource=data.toJSON();
      console.log(dataSource7);
    })

    /* firebase.database().ref('kanto').on('value', (snapshot) => {
      var data = snapshot.val();
      Object.values(data).forEach(item => {
        dataSource = dataSource.concat(item);
      });
      console.log('Data' + dataSource);
      //this.setState({items});
    }); */

    //console.log(dataSource);

    this.state = {
      loading: false,
      kanto: dataSource,




    };

  }

  state = {
    visibleRegionsModal: false,
  }

  componentWillMount() {





  }


  renderTeamItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        style={styles.item}
      //onPress = {this.changeElement(item)}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={{ uri: 'http://pokestadium.com/sprites/xy/' + item + '.gif' }}
        />
        <Text >{item}</Text>
      </TouchableOpacity>
    );
  }


  render() {
    console.log('render');
    //console.log(this.state.kanto);
    if (this.state.loading) {
      return (
        <View>
          <Text>Descargando Pokemon</Text>

        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button

            onPress={() => this.pickRegion("kanto")}
            title="team kanto"
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.pickRegion("johto")}
            title="team johto"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.pickRegion("hoenn")}
            title="team hoenn"
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.pickRegion("sinnoh")}
            title="team sinnoh"
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.pickRegion("unova")}
            title="team unova"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.pickRegion("kalos")}
            title="team kalos"
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
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
  teamContent: {

  },
});