import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS} from "../constants/orderConstants"

import {IOrderInfo} from '../types/common'

const initialState = {
    order: null as IOrderInfo | null,
    loading: false,
    error: '',
    success: false,
    paySuccess: false,
    payLoading: false
}

export const ordersReducer = (state = initialState, action: OrdersActionTypes) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {...state, loading: true, order: null}
        case ORDER_CREATE_SUCCESS:
            return {...state, loading: false, success: true, order: action.payload, error: ''}
        case ORDER_CREATE_FAIL:
            return {...state, loading: false, success: false, error: action.payload}
        case ORDER_DETAILS_REQUEST:
            return {...state, loading: true, order: null}
        case ORDER_DETAILS_SUCCESS:
            return {...state, loading: false, success: true, order: action.payload, error: ''}
        case ORDER_DETAILS_FAIL:
            return {...state, loading: false, success: false, error: action.payload}
        case ORDER_PAY_REQUEST:
            return {...state, payLoading: true}
        case ORDER_PAY_SUCCESS:
            return {...state, payLoading: false, paySuccess: true, error: ''}
        case ORDER_PAY_FAIL:
            return {...state, payLoading: false, paySuccess: false, error: action.payload}
        case ORDER_PAY_RESET:
            return {...state, payLoading: false, paySuccess: false, error: ''}
        default:
            return state
    }
}


// types

export type OrderInitialStateType = typeof initialState

export type OrdersActionTypes = OrderCreateRequestActionType | OrderCreateSuccessActionType | OrderCreateFailActionType |
    OrderDetailsRequestActionType | OrderDetailsSuccessActionType | OrderDetailsFailActionType | OrderPayRequestActionType |
    OrderPaySuccessActionType | OrderPayFailActionType | OrderPayResetActionType

interface OrderCreateRequestActionType {
    type: typeof ORDER_CREATE_REQUEST
}

interface OrderCreateSuccessActionType {
    type: typeof ORDER_CREATE_SUCCESS,
    payload: IOrderInfo
}

interface OrderCreateFailActionType {
    type: typeof ORDER_CREATE_FAIL,
    payload: string
}

interface OrderDetailsRequestActionType {
    type: typeof ORDER_DETAILS_REQUEST
}

interface OrderDetailsSuccessActionType {
    type: typeof ORDER_DETAILS_SUCCESS,
    payload: IOrderInfo
}

interface OrderDetailsFailActionType {
    type: typeof ORDER_DETAILS_FAIL,
    payload: string
}

interface OrderPayRequestActionType {
    type: typeof ORDER_PAY_REQUEST
}

interface OrderPaySuccessActionType {
    type: typeof ORDER_PAY_SUCCESS,
}

interface OrderPayFailActionType {
    type: typeof ORDER_PAY_FAIL,
    payload: string
}
interface OrderPayResetActionType {
    type: typeof ORDER_PAY_RESET,
}