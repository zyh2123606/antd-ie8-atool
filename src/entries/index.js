import './index.less'
import ReactDOM from 'react-dom'
import React from 'react'
import { hashHistory, browserHistory } from 'react-router'
import RouteView from '../routes'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as Reducers from '../reducers'
import { Router } from 'react-router'

const reducer = combineReducers({
    ...Reducers
})

const loggerMiddleware = createLogger()
const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
)(createStore)
const store = finalCreateStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <RouteView history={browserHistory} />
    </Provider>,
  document.getElementById('root')
)
