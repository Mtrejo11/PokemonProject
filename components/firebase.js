import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyA3lL6OyQUB9wFfq_vljnBCU9u2Ee_ka5Y",
    authDomain: "reactnativedatabase-e2a50.firebaseapp.com",
    databaseURL: "https://reactnativedatabase-e2a50.firebaseio.com",
    projectId: "reactnativedatabase-e2a50",
    storageBucket: "",
    messagingSenderId: "385603840051"
};
const Firebase = firebase.initializeApp(config);
export default Firebase;
