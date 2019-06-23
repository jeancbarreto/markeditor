import { createStore, combineReducers } from 'redux'
import reduceDocument from './reducers/reducerDocument'

const reducer = combineReducers({
    reduceDocument
})

const store = createStore(reducer)

export default store