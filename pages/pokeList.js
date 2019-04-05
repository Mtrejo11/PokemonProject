import React from 'react';
import { FlatList, Dimensions, Text, View, StyleSheet } from 'react-native';

const numColumns = 3;

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};


export default class PokeList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pokemon : [],
      url : 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151',
      loading : false,
    };
  }
  componentDidMount(){
    this.getPokemon();

  }

  getPokemon = () => {
    this.setState({loading:true})

    fetch(this.state.url)
    .then( res => res.json())
    .then(res => {
      this.setState({
          pokemon : res.results, 
          url : res.next,
          loading : false

      });
    });

  };


  renderItem = ({item}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  render(){

    if(this.state.loading){
      return(
        <View>
        <Text>Descargando Pokemon</Text>

        </View>
      )
    }

    return(
      <View style={styles.listado}>
        <Text>Listado de Pokemon</Text>
        <FlatList
          data = {formatData(this.state.pokemon, numColumns)}
          //style={styles.container}
          renderItem = {this.renderItem}
          keyExtractor = {(item, index) => index.toString()}
          numColumns={numColumns}
        />
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
});

export default PokeList;