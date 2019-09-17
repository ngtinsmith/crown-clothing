export const addItemToCart = (cartItems, cartItemToAdd) => {
    // check if item exists in current cartItems[] array
    const existingItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    )

    // increase quantity if existingItem
    if (existingItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    // return cartItems with the NEW_ITEM
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(
            /* 
                if (item ID is not equal to cartItemToRemove.id)
                    return it inside the cartItems array (INCLUDE IT)
                else
                    filter it out (REMOVE IT)
            */
            cartItem => cartItem.id !== cartItemToRemove.id
        )
    }

    // if quantity > 1
    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )
}
