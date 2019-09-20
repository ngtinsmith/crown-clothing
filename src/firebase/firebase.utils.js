import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: 'AIzaSyCkJFqcRJeA8jC6wyuxhDnceT1yeeujeHw',
    authDomain: 'crown-db-df591.firebaseapp.com',
    databaseURL: 'https://crown-db-df591.firebaseio.com',
    projectId: 'crown-db-df591',
    storageBucket: '',
    messagingSenderId: '349497271725',
    appId: '1:349497271725:web:cb1fefb165f842d8'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', console.log(error.message))
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
