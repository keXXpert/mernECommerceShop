import axios from "axios"
import { ThunkAction } from "redux-thunk"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../../constants/userConstants"
import { RootState } from "../store"
import { UserActionTypes } from "../userReducer"

export const login =
    (email: string, password: string): ThunkAction<void, RootState, unknown, UserActionTypes> =>
        async (dispatch) => {
            try {
                dispatch({ type: USER_LOGIN_REQUEST })
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const { data } = await axios.post('/api/users/login', { email, password }, config)
                dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
                localStorage.setItem('userInfo', JSON.stringify(data))
            } catch (err) {
                dispatch({ type: USER_LOGIN_FAIL, payload: err.response?.data?.message || err.message })
            }
        }

export const logout = (): ThunkAction<void, RootState, unknown, UserActionTypes> =>
    async (dispatch) => {
        dispatch({ type: USER_LOGOUT })
        localStorage.removeItem('userInfo')
    }