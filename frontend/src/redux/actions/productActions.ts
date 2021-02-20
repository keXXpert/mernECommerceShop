import axios from "axios"
import { ThunkAction } from "redux-thunk"
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../../constants/productConstants"
import { ProductsDetailsActionTypes, ProductsDetailsInitialStateType } from "../productDetailsReducer"
import { ProductsListActionTypes, ProductsListInitialStateType } from "../productListReducer"

export const listProducts = (): ThunkAction<void, ProductsListInitialStateType, unknown, ProductsListActionTypes> =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST })
            const { data } = await axios.get('/api/products')
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
        } catch (err) {
            dispatch({ type: PRODUCT_LIST_FAIL, payload: err.response?.data?.message || err.message })
        }
    }

export const listProductDetails = (id: string): ThunkAction<void, ProductsDetailsInitialStateType, unknown, ProductsDetailsActionTypes> =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_DETAILS_REQUEST })
            const { data } = await axios.get(`/api/products/${id}`)
            dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
        } catch (err) {
            dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.response?.data?.message || err.message })
        }
    }
