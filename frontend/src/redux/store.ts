import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction } from "redux-thunk";
import { productListReducer } from "./productListReducer";
import { productDetailsReducer } from './productDetailsReducer'

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
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