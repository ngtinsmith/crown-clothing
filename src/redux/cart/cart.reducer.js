import CartActionTypes from './cart.types'
import { addItemToCart, removeItemFromCart } from './cart.utils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }

        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                // cartItems: [...state.cartItems, action.payload] // old no-quantiy
                cartItems: addItemToCart(
                    state.cartItems,
                    action.payload
                )
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(
                    state.cartItems,
                    action.payload
                )
            }

        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    /*
                        if (item ID is not equal to payload/to-be-removed item ID
                            ~ passed from action)
                            return it inside the cartItems array
                        else
                            filter it out (REMOVE IT)
                    */
                    cartItem => cartItem.id !== action.payload.id
                )
            }

        default:
            return state
    }
}

export default cartReducer
