import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants"
import { IProduct } from '../types/common'

const initialState = {
    product: null as IProduct | null,
    loading: false,
    error: ''
}

export const productDetailsReducer = (state = initialState, action: ProductsDetailsActionTypes) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true, product: null }
        case PRODUCT_DETAILS_SUCCESS:
            return { ...state, loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}


// types

export type ProductsDetailsInitialStateType = typeof initialState

export type ProductsDetailsActionTypes = ProductDetailsRequestActionType | ProductDetailsSuccessActionType | ProductDetailsFailActionType

interface ProductDetailsRequestActionType {
    type: typeof PRODUCT_DETAILS_REQUEST
}

interface ProductDetailsSuccessActionType {
    type: typeof PRODUCT_DETAILS_SUCCESS,
    payload: IProduct
}

interface ProductDetailsFailActionType {
    type: typeof PRODUCT_DETAILS_FAIL,
    payload: string
}