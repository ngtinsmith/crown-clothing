import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCkJFqcRJeA8jC6wyuxhDnceT1yeeujeHw",
    authDomain: "crown-db-df591.firebaseapp.com",
    databaseURL: "https://crown-db-df591.firebaseio.com",
    projectId: "crown-db-df591",
    storageBucket: "",
    messagingSenderId: "349497271725",
    appId: "1:349497271725:web:cb1fefb165f842d8"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase