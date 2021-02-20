import axios from "axios"
import { ThunkAction } from "redux-thunk"
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../../constants/productConstants"
import { ProductsListActionTypes, ProductsListInitialStateType } from "../productReducer"

export const listProducts = (): ThunkAction<void, ProductsListInitialStateType, unknown, ProductsListActionTypes> => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/api/products')
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.response?.data?.message || err.message })
    }
}
