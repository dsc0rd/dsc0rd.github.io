import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import CommonReducer from './reducer.js'



const store = createStore(
combineReducers({
  commonReducer: CommonReducer
}),
applyMiddleware( thunk )
)



export default store
