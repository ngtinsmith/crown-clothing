import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionPage from './collection.component'

const mapStateToProps = createStructuredSelector({
    /*
        reverse selectIsCollectionsLoaded
        selectIsCollectionsLoaded = false initialized

        isLoading = false           => wrapper is rendered / incorrect behavior
        isLoading = !false = true   => spinner is rendered / correct behavior
    */
    isLoading: state => !selectIsCollectionsLoaded(state)
})

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)

export default CollectionPageContainer
