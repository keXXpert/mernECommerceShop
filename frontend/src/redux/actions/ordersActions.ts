import axios from "axios";
import {ThunkAction} from "redux-thunk";
import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_USER_LIST_FAIL, ORDER_USER_LIST_REQUEST, ORDER_USER_LIST_SUCCESS} from "../../constants/orderConstants";
import {IOrderInfo} from "../../types/common";
import {OrdersActionTypes} from "../ordersReducer";
import {RootState} from "../store";
import {emptyCartItems} from "./cartActions";

export const createOrder = (order: IOrderInfo): ThunkAction<void, RootState, unknown, OrdersActionTypes> =>
    async (dispatch, getState) => {
        try {
            dispatch({type: ORDER_CREATE_REQUEST})
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getState().user.userInfo.token
                }
            }
            const {data} = await axios.post('/api/order', order, config)
            dispatch({type: ORDER_CREATE_SUCCESS, payload: data})

        } catch (err) {
            dispatch({type: ORDER_CREATE_FAIL, payload: err.response?.data?.message || err.message})
        }
    }

   
export const getOrderDetails = (orderId: string): ThunkAction<void, RootState, unknown, OrdersActionTypes> =>
    async (dispatch, getState) => {
        try {
            dispatch({type: ORDER_DETAILS_REQUEST})
            const config = {
                headers: {
                    Authorization: 'Bearer ' + getState().user.userInfo.token
                }
            }
            const {data} = await axios.get(`/api/order/${orderId}`, config)
            dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})

        } catch (err) {
            dispatch({type: ORDER_DETAILS_FAIL, payload: err.response?.data?.message || err.message})
        }
    }

export const payOrder = (orderId: string, paymentResult: any): ThunkAction<void, RootState, unknown, OrdersActionTypes> =>
    async (dispatch, getState) => {
        try {
            dispatch({type: ORDER_PAY_REQUEST})
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getState().user.userInfo.token
                }
            }
            await axios.put(`/api/order/${orderId}/pay`, paymentResult, config)
            dispatch({type: ORDER_PAY_SUCCESS})
            dispatch(emptyCartItems())

        } catch (err) {
            dispatch({type: ORDER_PAY_FAIL, payload: err.response?.data?.message || err.message})
        }
    }

export const resetOrderPaid = () => ({type: ORDER_PAY_RESET})

export const getUserOrders = (): ThunkAction<void, RootState, unknown, OrdersActionTypes> =>
    async (dispatch, getState) => {
        try {
            dispatch({type: ORDER_USER_LIST_REQUEST})
            const config = {
                headers: {
                    Authorization: 'Bearer ' + getState().user.userInfo.token
                }
            }
            const {data} = await axios.get(`/api/order/myorders`, config)
            dispatch({type: ORDER_USER_LIST_SUCCESS, payload: data})

        } catch (err) {
            dispatch({type: ORDER_USER_LIST_FAIL, payload: err.response?.data?.message || err.message})
        }
    }