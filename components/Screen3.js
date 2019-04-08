import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import firebase from './firebase';
import Modal from 'react-native-modal';

export default class Screen3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: null,
        }
    }

    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );



    //Closing app and deleting * from database
    closeApp() {
        this.setState({ modal: null })
        firebase.database().ref('kanto').remove();
        firebase.database().ref('johto').remove();
        firebase.database().ref('hoenn').remove();
        firebase.database().ref('sinnoh').remove();
        firebase.database().ref('unova').remove();
        firebase.database().ref('kalos').remove();
        firebase.database().goOffline();
        BackHandler.exitApp();


    }

    _renderModalContent = () => (
        <View style={styles.modalContent}>

            <Text>Are you sure?</Text>
      
                {this._renderButton('Yes, I want to exit', () => this.closeApp())}
                {this._renderButton('Close', () => this.setState({ modal: null })) }



        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginLeft: 80, }}>
                    <Text style={{ fontSize: 20 }}>Do you want to exit?</Text>
                    <Text style={{ fontSize: 20 }}> You will lose all your stored data</Text>
                </View>

                {this._renderButton('Exit', () => this.setState({ modal: 1 }))}


                <Modal isVisible={this.state.modal === 1}>
                    {this._renderModalContent()}
                </Modal>


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
});


