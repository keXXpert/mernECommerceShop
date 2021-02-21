import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction } from "redux-thunk";
import { productListReducer } from "./productListReducer";
import { productDetailsReducer } from './productDetailsReducer'
import { cartReducer } from "./cartReducer";
import { userLoginReducer } from "./userReducer";

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userLoginReducer,
})

const initialState = {}
const middleware = [
    thunk
]
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

export type RootState = ReturnType<typeof reducers>

export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>