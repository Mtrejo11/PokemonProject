import React from 'react';
import { FlatList, Dimensions, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import firebase from './firebase';


const numColumns = 3;
var cant = 0;
var arrayteam = [];

//Method to data to avoid blank spaces

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};


var id;
export default class PokeList extends React.Component {

  constructor(props) {
    super(props);
     id = this.props.navigation.state.params.idRegion
    //alert(id)
    var dir = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';

    if (id == 'kanto') {
      dir = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
    }
    else if (id == 'johto') {
      dir = 'https://pokeapi.co/api/v2/pokemon?offset=152&limit=135';
    }
    else if (id == 'hoenn') {

    }
    else if (id == 'sinnoh') {

    }
    else if (id == 'unova') {

    }
    else if (id == 'kalos') {

    }
    else {
      dir = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
    }


    this.state = {
      pokemon: [],
      url: dir,
      loading: false,



    };


  }

  state = {
    visibleModal: false,
    selected: '',
    team: [],
  };

  componentWillMount() {
    this.getPokemon();

  }

  getPokemon = () => {
    this.setState({ loading: true, visibleModal: false })

    fetch(this.state.url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          pokemon: res.results,
          url: res.next,
          loading: false

        });
      });

  };


  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

//Inserting pokemon into database
  insertTeam(item) {
    if (cant < 6) {
      arrayteam.push(item);
      this.setState({ team: arrayteam });
      
      cant++;

      firebase.database().ref(id+'/'+cant).set(
        {
          name: item
        }
      ).then(() => {
        alert('Pokemon inserted in your team');
      }).catch((error) => {
        console.log(error);
      });
    }
    else {
      alert("You don't have any available slots.")
    }

  }


//Modal content setting
  _renderModalContent = (item) => (
    <View style={styles.modalContent}>
      <Image
        style={{ width: 60, height: 60 }}
        source={{ uri: 'http://pokestadium.com/sprites/xy/' + item + '.gif' }}
      />
      <Text>{item}</Text>
      {this._renderButton('Add to my team', () => this.insertTeam(item))}
      {this._renderButton('Close', () => this.setState({ visibleModal: null })) }


    </View>
  );




  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.setState({ visibleModal: 1, selected: item.name })}
      >
        <Image
          style={{ width: 60, height: 60 }}
          source={{ uri: 'http://pokestadium.com/sprites/xy/' + item.name + '.gif' }}
        />
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };





  render() {

    if (this.state.loading) {
      return (
        <View>
          <Text>Downloading Pokemon</Text>

        </View>
      )
    }

    return (
      <View style={styles.listado}>

        <FlatList
          data={formatData(this.state.pokemon, numColumns)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}

        />

        <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent(this.state.selected)}
        </Modal>

        
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

