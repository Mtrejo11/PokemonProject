import React from 'react';
import { FlatList, Dimensions, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import firebase from 'firebase';


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
export default class Teams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            loading: false,
            kanto: [],
            johto: [],
            sinnoh: [],
            hoenn: [],
            unova: [],
            kalos: [],




        };

    }

    state = {
        visibleRegionsModal: false,
    }

    componentDidMount() {


        firebase.database().ref('kanto').on('value', (data) => {
            //console.log();
            this.setState({
                kanto : data.toJSON()
            })
          })
      

    }

    renderItem = ({ item }) => {
        if (item.empty === true) {
          return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
          <TouchableOpacity
            style={styles.item}
            //onPress={() => this.setState({ visibleModal: 1, selected: item.name })}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={{ uri: 'http://pokestadium.com/sprites/xy/' + item + '.gif' }}
            />
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        );
      };

      

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
              data={this.state.kanto}
              //style={styles.container}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={numColumns}
    
            />
    
    
    
    
            {/* <Modal isVisible={this.state.visibleModal === 1}>
              {this._renderModalContent(this.state.selected)}
            </Modal>
    
            <Modal isVisible={this.state.visibleTeamModal === 1}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}
            >
              {this._renderTeamModalContent()}
    
            </Modal> */}
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