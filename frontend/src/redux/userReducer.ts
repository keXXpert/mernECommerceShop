import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants"
import { IUserInfo } from "../types/common"

const userInfoFromLS = localStorage.getItem('userInfo')

const initialState = {
    userInfo: userInfoFromLS ? JSON.parse(userInfoFromLS) : null as IUserInfo | null,
    loading: false,
    error: ''
}

export const userLoginReducer = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true }
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload, error: '' }
        case USER_LOGIN_FAIL:
            return { ...state, loading: false, error: action.payload }
        case USER_LOGOUT:
            return { ...state, userInfo: null }
        default:
            return state
    }
}

// types
export type UserInitialStateType = typeof initialState

export type UserActionTypes = UserLoginRequestActionType | UserLogoutActionType | UserLoginSuccessActionType | UserLoginFailActionType

interface UserLoginRequestActionType {
    type: typeof USER_LOGIN_REQUEST,
}

interface UserLoginSuccessActionType {
    type: typeof USER_LOGIN_SUCCESS,
    payload: IUserInfo
}

interface UserLoginFailActionType {
    type: typeof USER_LOGIN_FAIL,
    payload: string
}

interface UserLogoutActionType {
    type: typeof USER_LOGOUT,
}
