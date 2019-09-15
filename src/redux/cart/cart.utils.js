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