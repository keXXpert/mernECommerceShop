import axios from "axios"
import {ThunkAction} from "redux-thunk"
import {ORDER_RESET} from "../../constants/orderConstants"
import {
    USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS, USER_DETAILS_UPDATE_FAIL, USER_DETAILS_UPDATE_REQUEST, USER_DETAILS_UPDATE_SUCCESS,
    USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS
} from "../../constants/userConstants"
import {IUserDetails} from "../../types/common"
import {OrdersActionTypes} from "../ordersReducer"
import {RootState} from "../store"
import {UserActionTypes} from "../userReducer"

export const login =
    (email: string, password: string): ThunkAction<void, RootState, unknown, UserActionTypes> =>
        async (dispatch) => {
            try {
                dispatch({type: USER_LOGIN_REQUEST})
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const {data} = await axios.post('/api/users/login', {email, password}, config)
                dispatch({type: USER_LOGIN_SUCCESS, payload: data})
                localStorage.setItem('userInfo', JSON.stringify(data))
            } catch (err) {
                dispatch({type: USER_LOGIN_FAIL, payload: err.response?.data?.message || err.message})
            }
        }

export const logout = (): ThunkAction<void, RootState, unknown, UserActionTypes | OrdersActionTypes> =>
    async (dispatch) => {
        dispatch({type: USER_LOGOUT})
        dispatch({type: ORDER_RESET})
        localStorage.removeItem('userInfo')
    }

export const register = (name: string, email: string, password: string): ThunkAction<void, RootState, unknown, UserActionTypes> =>
    async (dispatch) => {
        try {
            dispatch({type: USER_REGISTER_REQUEST})
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const {data} = await axios.post('/api/users', {name, email, password}, config)
            dispatch({type: USER_REGISTER_SUCCESS, payload: data})
            dispatch({type: USER_LOGIN_SUCCESS, payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (err) {
            dispatch({type: USER_REGISTER_FAIL, payload: err.response?.data?.message || err.message})
        }
    }

export const getUserDetails = (id: string = ''): ThunkAction<void, RootState, unknown, UserActionTypes> =>
    async (dispatch, getState) => {
        try {
            dispatch({type: USER_DETAILS_REQUEST})
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getState().user.userInfo?.token || ''
                }
            }
            const {data} = await axios.get('/api/users/' + (id || 'profile'), config)
            dispatch({type: USER_DETAILS_SUCCESS, payload: data})

        } catch (err) {
            dispatch({type: USER_DETAILS_FAIL, payload: err.response?.data?.message || err.message})
        }
    }

export const updateUserProfile = (user: IUserDetails): ThunkAction<void, RootState, unknown, UserActionTypes> =>
    async (dispatch, getState) => {
        try {
            dispatch({type: USER_UPDATE_REQUEST})
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getState().user.userInfo?.token || ''
                }
            }
            const {data} = await axios.put('/api/users/profile', user, config)
            dispatch({type: USER_UPDATE_SUCCESS, payload: data})

        } catch (err) {
            dispatch({type: USER_UPDATE_FAIL, payload: err.response?.data?.message || err.message})
        }
    }

export const getUsersList = (): ThunkAction<void, RootState, unknown, UserActionTypes> =>
    async (dispatch, getState) => {
        try {
            dispatch({type: USER_LIST_REQUEST})
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getState().user.userInfo?.token || ''
                }
            }
            const {data} = await axios.get('/api/users', config)
            dispatch({type: USER_LIST_SUCCESS, payload: data})

        } catch (err) {
            dispatch({type: USER_LIST_FAIL, payload: err.response?.data?.message || err.message})
        }
    }

export const deleteUser = (id: string): ThunkAction<void, RootState, unknown, UserActionTypes> =>
    async (dispatch, getState) => {
        try {
            dispatch({type: USER_DELETE_REQUEST})
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getState().user.userInfo?.token || ''
                }
            }
            await axios.delete(`/api/users/${id}`, config)
            dispatch({type: USER_DELETE_SUCCESS})

        } catch (err) {
            dispatch({type: USER_DELETE_FAIL, payload: err.response?.data?.message || err.message})
        }
    }

export const updateUserDetails = (user: IUserDetails): ThunkAction<void, RootState, unknown, UserActionTypes> =>
    async (dispatch, getState) => {
        try {
            dispatch({type: USER_DETAILS_UPDATE_REQUEST})
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getState().user.userInfo?.token || ''
                }
            }
            const {data} = await axios.put('/api/users/' + user.id, user, config)
            dispatch({type: USER_DETAILS_UPDATE_SUCCESS, payload: data})
            dispatch({type: USER_DETAILS_SUCCESS, payload: data})

        } catch (err) {
            dispatch({type: USER_DETAILS_UPDATE_FAIL, payload: err.response?.data?.message || err.message})
        }
    }