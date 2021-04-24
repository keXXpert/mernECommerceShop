import {USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_UPDATE_FAIL, USER_DETAILS_UPDATE_REQUEST, USER_DETAILS_UPDATE_RESET, USER_DETAILS_UPDATE_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS} from "../constants/userConstants"
import {IUserInfo} from "../types/common"

const userInfoFromLS = localStorage.getItem('userInfo')

const initialState = {
    userInfo: userInfoFromLS ? JSON.parse(userInfoFromLS) as IUserInfo | null : null as IUserInfo | null,
    usersList: null as IUserInfo[] | null,
    userDetails: null as IUserInfo | null,
    loading: false,
    error: '',
    success: false,
    deleteLoading: false,
    deleteSuccess: false,
    deleteError: ''
}

export const userLoginReducer = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {...state, loading: true}
        case USER_LOGIN_SUCCESS:
            return {...state, loading: false, userInfo: action.payload, error: ''}
        case USER_LOGIN_FAIL:
            return {...state, loading: false, error: action.payload}
        case USER_LOGOUT:
            return {...state, userInfo: null}
        case USER_REGISTER_REQUEST:
            return {...state, loading: true}
        case USER_REGISTER_SUCCESS:
            return {...state, loading: false, userInfo: action.payload, error: ''}
        case USER_REGISTER_FAIL:
            return {...state, loading: false, error: action.payload}
        case USER_DETAILS_REQUEST:
            return {...state, loading: true}
        case USER_DETAILS_SUCCESS:
            return {...state, loading: false, userDetails: action.payload, error: ''}
        case USER_DETAILS_FAIL:
            return {...state, loading: false, error: action.payload}
        case USER_UPDATE_REQUEST:
            return {...state, loading: true, success: false}
        case USER_UPDATE_SUCCESS:
            return {...state, loading: false, success: true, userInfo: action.payload, error: ''}
        case USER_UPDATE_FAIL:
            return {...state, loading: false, error: action.payload, success: false}
        case USER_UPDATE_RESET:
            return {...state, loading: false, error: action.payload}
        case USER_LIST_REQUEST:
            return {...state, loading: true}
        case USER_LIST_SUCCESS:
            return {...state, loading: false, usersList: action.payload, error: ''}
        case USER_LIST_FAIL:
            return {...state, loading: false, error: action.payload}
        case USER_DELETE_REQUEST:
            return {...state, deleteLoading: true, deleteSuccess: false, deleteError: ''}
        case USER_DELETE_SUCCESS:
            return {...state, deleteLoading: false, deleteSuccess: true, deleteError: ''}
        case USER_DELETE_FAIL:
            return {...state, deleteLoading: false, deleteSuccess: false, deleteError: action.payload}
        case USER_DETAILS_UPDATE_REQUEST:
            return {...state, loading: true, success: false}
        case USER_DETAILS_UPDATE_SUCCESS:
            return {...state, loading: false, success: true, userDetails: action.payload, error: ''}
        case USER_DETAILS_UPDATE_FAIL:
            return {...state, loading: false, error: action.payload, success: false}
        case USER_DETAILS_UPDATE_RESET:
            return {...state, loading: false, error: action.payload, success: false}

        default:
            return state
    }
}

// types
export type UserInitialStateType = typeof initialState

export type UserActionTypes = UserLoginRequestActionType | UserLogoutActionType | UserLoginSuccessActionType |
    UserLoginFailActionType | UserRegisterRequestActionType | UserRegisterSuccessActionType | UserRegisterFailActionType |
    UserDetailsRequestActionType | UserDetailsSuccessActionType | UserDetailsFailActionType | UserUpdateRequestActionType |
    UserUpdateSuccessActionType | UserUpdateFailActionType | UserUpdateResetActionType | UserListRequestActionType |
    UserListSuccessActionType | UserListFailActionType | UserDeleteRequestActionType | UserDeleteSuccessActionType |
    UserDeleteFailActionType | UserDetailsUpdateRequestActionType | UserDetailsUpdateSuccessActionType | UserDetailsUpdateFailActionType |
    UserDetailsUpdateResetActionType

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

interface UserRegisterRequestActionType {
    type: typeof USER_REGISTER_REQUEST,
}

interface UserRegisterSuccessActionType {
    type: typeof USER_REGISTER_SUCCESS,
    payload: IUserInfo
}

interface UserRegisterFailActionType {
    type: typeof USER_REGISTER_FAIL,
    payload: string
}

interface UserDetailsRequestActionType {
    type: typeof USER_DETAILS_REQUEST,
}

interface UserDetailsSuccessActionType {
    type: typeof USER_DETAILS_SUCCESS,
    payload: IUserInfo
}

interface UserDetailsFailActionType {
    type: typeof USER_DETAILS_FAIL,
    payload: string
}

interface UserUpdateRequestActionType {
    type: typeof USER_UPDATE_REQUEST,
}

interface UserUpdateSuccessActionType {
    type: typeof USER_UPDATE_SUCCESS,
    payload: IUserInfo
}

interface UserUpdateFailActionType {
    type: typeof USER_UPDATE_FAIL,
    payload: string
}

interface UserUpdateResetActionType {
    type: typeof USER_UPDATE_RESET,
    payload: string
}

interface UserListRequestActionType {
    type: typeof USER_LIST_REQUEST,
}

interface UserListSuccessActionType {
    type: typeof USER_LIST_SUCCESS,
    payload: IUserInfo[]
}

interface UserListFailActionType {
    type: typeof USER_LIST_FAIL,
    payload: string
}

interface UserDeleteRequestActionType {
    type: typeof USER_DELETE_REQUEST,
}

interface UserDeleteSuccessActionType {
    type: typeof USER_DELETE_SUCCESS,
}

interface UserDeleteFailActionType {
    type: typeof USER_DELETE_FAIL,
    payload: string
}

interface UserDetailsUpdateRequestActionType {
    type: typeof USER_DETAILS_UPDATE_REQUEST,
}

interface UserDetailsUpdateSuccessActionType {
    type: typeof USER_DETAILS_UPDATE_SUCCESS,
    payload: IUserInfo
}

interface UserDetailsUpdateFailActionType {
    type: typeof USER_DETAILS_UPDATE_FAIL,
    payload: string
}

interface UserDetailsUpdateResetActionType {
    type: typeof USER_DETAILS_UPDATE_RESET,
    payload: string
}

