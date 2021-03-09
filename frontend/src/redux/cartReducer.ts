import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from "../constants/cartConstants"
import {ICartItem, IShippingInfo} from '../types/common'

const cartItemsFromLS = localStorage.getItem('cartItems')
const shippingAddress = localStorage.getItem('shippingAddress')
const paymentMethod = localStorage.getItem('paymentMethod')

const initialState = {
    cartItems: cartItemsFromLS ? JSON.parse(cartItemsFromLS) : [] as ICartItem[],
    shippingAddress: shippingAddress ? JSON.parse(shippingAddress) : null as IShippingInfo | null,
    paymentMethod: paymentMethod || ''
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
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload}
        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload}
        default:
            return state
    }
}


// types

export type CartInitialStateType = typeof initialState

export type CartActionTypes = CartAddItemActionType | CartRemoveItemActionType | CartSaveShippingActionType | CartSavePaymentMethodActionType

interface CartAddItemActionType {
    type: typeof CART_ADD_ITEM,
    payload: ICartItem
}

interface CartRemoveItemActionType {
    type: typeof CART_REMOVE_ITEM,
    payload: ICartItem
}

interface CartSaveShippingActionType {
    type: typeof CART_SAVE_SHIPPING_ADDRESS,
    payload: IShippingInfo
}
interface CartSavePaymentMethodActionType {
    type: typeof CART_SAVE_PAYMENT_METHOD,
    payload: string
}

