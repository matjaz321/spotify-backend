import firebase from 'firebase/app';
import 'firebase/database';
import { resolve } from 'dns';

var config = {
    apiKey: "AIzaSyC4vzvCktqKNbkq0tgh3HS2hzbHwHAtpGk",
    authDomain: "spotify-d76b9.firebaseapp.com",
    databaseURL: "https://spotify-d76b9.firebaseio.com",
    projectId: "spotify-d76b9",
    storageBucket: "spotify-d76b9.appspot.com",
    messagingSenderId: "585376746305"
};

firebase.initializeApp(config);
const database = firebase.database();

async function saveAuthData(authData) {
    const userId = await latestUserId();
    database.ref(`users/${userId + 1}`).set(authData);
}

async function latestUserId() {
    const userId = await database.ref('users').once('value').then(snapshot => {
        if (!isNaN(snapshot.val())) {
            return 0;
        } else {
            return Object.keys(snapshot.val()).map(function(_) { return snapshot.val()[_]; }).length;
        }
    })
    return userId;
}

async function getUserToken() {

}

export default {
    saveAuthData,
    getUserToken
};