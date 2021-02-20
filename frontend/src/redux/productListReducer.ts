import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"
import { IProduct } from '../types/common'

const initialState = {
    products: [] as IProduct[],
    loading: false,
    error: ''
}

export const productListReducer = (state = initialState, action: ProductsListActionTypes) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}


// types

export type ProductsListInitialStateType = typeof initialState

export type ProductsListActionTypes = ProductListRequestActionType | ProductListSuccessActionType | ProductListFailActionType

interface ProductListRequestActionType {
    type: typeof PRODUCT_LIST_REQUEST
}

interface ProductListSuccessActionType {
    type: typeof PRODUCT_LIST_SUCCESS,
    payload: IProduct[]
}

interface ProductListFailActionType {
    type: typeof PRODUCT_LIST_FAIL,
    payload: string
}