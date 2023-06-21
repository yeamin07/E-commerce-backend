import {createStore,combineReducers,applyMiddleware} from 'redux'
//import logger from 'redux-logger'
//import {composeWithDevTools} from 'redux-devtools-extension'

export const counterReducer = (state = 1000, action) => { //dispatch == action
  switch (action.type) {
    case 'INCREASE' : {
            return state + action.payload
    }
    case 'DECREASE' : {
            return state - action.payload
    }
    default : {
        return state
    }
  }
}

const initState = {
    bgColor: 'white',
    textColor: '#000000'
}

export const themeReducer = (state = initState,action) => {
  switch (action.type) {
    case 'CHANGE_BG_COLOR' : {
        return {
            ...state,
            bgColor: action.payload
        }
    }
    case 'CHANGE_TEXT_COLOR' : {
        return {
            ...state,
            textColor: action.payload
        }
    }
    default : {
        return state;
    }
  }
}

const rootReducer = combineReducers({
    counterReducer,
    themeReducer,
})

//Read middleware properly😑
/*const myLogger = (store) => (next) => (action) => {
   console.log(`Prev State: ${JSON.stringify(store.getState())}`);
   console.log(`ACTION: ${JSON.stringify(action)}`)
   next(action)
}*/

export const store  = createStore(rootReducer)
