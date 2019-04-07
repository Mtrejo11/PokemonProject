import React from 'react';
import { FlatList, Dimensions, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import firebase from 'firebase';


const numColumns = 3;
var cant = 0;
var arrayteam = [];

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
    else if (id == 'alola') {

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
    visibleTeamModal: false,
    selected: '',
    changeSelection: '',
    team: [],
  };

  componentWillMount() {
    this.getPokemon();
/*     var config = {
      apiKey: "AIzaSyA3lL6OyQUB9wFfq_vljnBCU9u2Ee_ka5Y",
      authDomain: "reactnativedatabase-e2a50.firebaseapp.com",
      databaseURL: "https://reactnativedatabase-e2a50.firebaseio.com",
      projectId: "reactnativedatabase-e2a50",
      storageBucket: "",
      messagingSenderId: "385603840051"
    };
    firebase.initializeApp(config); */
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


  insertTeam(item) {
    if (cant < 6) {
      arrayteam.push(item);
      this.setState({ team: arrayteam });
      alert(this.state.team);
      cant++;

      firebase.database().ref(id+'/'+cant).set(
        {
          name: item
        }
      ).then(() => {
        alert('INSERTED !');
      }).catch((error) => {
        console.log(error);
      });
    }
    else {
      alert('Haz alcanzado el maximo de pokemon por equipo.')
    }

  }



  _renderModalContent = (item) => (
    <View style={styles.modalContent}>
      <Image
        style={{ width: 60, height: 60 }}
        source={{ uri: 'http://pokestadium.com/sprites/xy/' + item + '.gif' }}
      />
      <Text>{item}</Text>
      {this._renderButton('Add to my team', () => this.insertTeam(item))}
      {this._renderButton('Close', () => this.setState({ visibleModal: null })) /*this._renderButton('Add to my team', () => this.setState({ visibleTeamModal: 1, visibleModal: null }))*/}


    </View>
  );




  renderTeamItem = ({ item }) => {
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


  _renderTeamModalContent = () => (

    <View style={styles.modalContent}>
      <Text>Your team</Text>
      <FlatList
        data={this.state.team}
        //style={styles.container}
        renderItem={
          //({item}) => <Text>{item.name} </Text>
          this.renderTeamItem
        }
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}

      />
      {this._renderButton('Close', () => this.setState({ visibleTeamModal: null }))}


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

  fillTeam(data) {
    var arrayTeam = [];
    for (var i = 0; i < 6; i++) {
      // note: we add a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      //team.push(<ObjectRow key={i} />);
      arrayTeam[i] = data[i];
    }
    //alert(arrayTeam);
    this.setState(this.state.team);
  }




  render() {

    if (this.state.loading) {
      return (
        <View>
          <Text>Descargando Pokemon</Text>

        </View>
      )
    }

    return (
      <View style={styles.listado}>
        <Text>Listado de Pokemon</Text>

        <FlatList
          data={formatData(this.state.pokemon, numColumns)}
          //style={styles.container}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}

        />




        <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent(this.state.selected)}
        </Modal>

        <Modal isVisible={this.state.visibleTeamModal === 1}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
          {this._renderTeamModalContent()}

        </Modal>
      </View>
    );
  }

  componentDidMount() {
  }
  /*
    llenarEquipo(data){
      team = [];
      for (var i = 0; i < 3; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        //team.push(<ObjectRow key={i} />);
        team.push(data[i]);
        
      }
    }
  */

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

