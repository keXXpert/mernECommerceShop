import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS} from "../constants/orderConstants"

import {IOrderInfo} from '../types/common'

const initialState = {
    order: null as IOrderInfo | null,
    loading: false,
    error: '',
    success: false
}

export const ordersReducer = (state = initialState, action: OrdersActionTypes) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {...state, loading: true, order: null}
        case ORDER_CREATE_SUCCESS:
            return {...state, loading: false, success: true, order: action.payload, error: ''}
        case ORDER_CREATE_FAIL:
            return {...state, loading: false, success: false, error: action.payload}
        default:
            return state
    }
}


// types

export type OrderInitialStateType = typeof initialState

export type OrdersActionTypes = OrderCreateRequestActionType | OrderCreateSuccessActionType | OrderCreateFailActionType

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