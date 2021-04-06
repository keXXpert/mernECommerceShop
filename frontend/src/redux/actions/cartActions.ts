import axios from "axios"
import {ThunkAction} from "redux-thunk"
import {CART_ADD_ITEM, CART_ITEMS_RESET, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from "../../constants/cartConstants"
import {ICartItem, IShippingInfo} from "../../types/common"
import {CartActionTypes} from "../cartReducer"
import {RootState} from "../store"

export const addToCart =
    (id: string, qty: number): ThunkAction<void, RootState, unknown, CartActionTypes> =>
        async (dispatch, getState) => {
            const {data} = await axios.get(`/api/products/${id}`)
            dispatch({
                type: CART_ADD_ITEM,
                payload: {
                    product: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    qty
                }
            })
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        }

export const removeFromCart = (item: ICartItem): ThunkAction<void, RootState, unknown, CartActionTypes> =>
    (dispatch, getState) => {
        dispatch({type: CART_REMOVE_ITEM, payload: item})
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }

export const saveShippingAddress = (data: IShippingInfo): ThunkAction<void, RootState, unknown, CartActionTypes> =>
    (dispatch) => {
        dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data})
        localStorage.setItem('shippingAddress', JSON.stringify(data))
    }

export const savePaymentMethod = (method: string): ThunkAction<void, RootState, unknown, CartActionTypes> =>
    (dispatch) => {
        dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: method})
        localStorage.setItem('paymentMethod', JSON.stringify(method))
    }

export const emptyCartItems = (): ThunkAction<void, RootState, unknown, CartActionTypes> => (dispatch) => {
    dispatch({ type: CART_ITEMS_RESET });
       
    localStorage.removeItem('cartItems');
    }; 