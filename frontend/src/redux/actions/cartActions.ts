import axios from "axios"
import { ThunkAction } from "redux-thunk"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../../constants/cartConstants"
import { ICartItem } from "../../types/common"
import { CartActionTypes } from "../cartReducer"
import { RootState } from "../store"

export const addToCart =
    (id: string, qty: number): ThunkAction<void, RootState, unknown, CartActionTypes> =>
        async (dispatch, getState) => {
            const { data } = await axios.get(`/api/products/${id}`)
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
    async (dispatch, getState) => {
        dispatch({ type: CART_REMOVE_ITEM, payload: item })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }