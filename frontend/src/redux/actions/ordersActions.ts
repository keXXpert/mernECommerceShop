import axios from "axios";
import {ThunkAction} from "redux-thunk";
import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS} from "../../constants/orderConstants";
import {IOrderInfo} from "../../types/common";
import {OrdersActionTypes} from "../ordersReducer";
import {RootState} from "../store";

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