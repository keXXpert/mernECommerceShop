import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"
import { ICartItem } from '../types/common'

const cartItemsFromLS = localStorage.getItem('cartItems')

const initialState = {
    cartItems: cartItemsFromLS ? JSON.parse(cartItemsFromLS) : [] as ICartItem[]
}

export const cartReducer = (state = initialState, action: CartActionTypes) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const exists = state.cartItems.some((el: ICartItem) => el.product === item.product)
            if (!exists) return {
                ...state,
                cartItems: [...state.cartItems, item],
            }
            else return {
                ...state,
                cartItems: state.cartItems.map((el: ICartItem) => el.product === item.product ? item : el)
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((el: ICartItem) => el.product !== action.payload.product)
            }
        default:
            return state
    }
}


// types

export type CartInitialStateType = typeof initialState

export type CartActionTypes = CartAddItemActionType | CartRemoveItemActionType

interface CartAddItemActionType {
    type: typeof CART_ADD_ITEM,
    payload: ICartItem
}

interface CartRemoveItemActionType {
    type: typeof CART_REMOVE_ITEM,
    payload: ICartItem
}
