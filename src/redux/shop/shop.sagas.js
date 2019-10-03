import { takeLatest, call, put } from 'redux-saga/effects'

import {
    firestore,
    convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils'
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions'

import ShopActionTypes from './shop.types'

export function* fetchCollectionsAsync() {
    try {
        const collectionsRef = firestore.collection('collections')
        const snapshot = yield collectionsRef.get()

        /* use call() to direct control to redux-saga
        in case further async control is needed */
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap,
            snapshot
        )

        // saga effect for creating actions / like dispatch
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}
