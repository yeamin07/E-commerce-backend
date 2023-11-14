import {ADD_TO_CART, REMOVE_ITEM_FROM_CART, MODIFY_QUNATITY_OF_A_ITEM, CLEAR_CART} from '../actions/cart'


export const cartReducer = (state=[], action) => {
    switch(action.type) {
        case ADD_TO_CART : {
            const product = state.find(item => item.id === action.payload.id)

            return product? state.map(item => {
                if (item.id === action.payload.id) {
                    item.quantity += 1
                }
                return item
            }) : ([...state, {...action.payload, quantity:1}])
        }

        case REMOVE_ITEM_FROM_CART : {
            return state.filter(item => item.id !== action.payload)
        }

        case MODIFY_QUNATITY_OF_A_ITEM : {
            return state.map(item => {
                if (item.id === action.payload.id){
                    item.quantity = action.payload.quantity
                }
                return item
            })
        }

        case CLEAR_CART : {
            return []
        }

        default : {
            return state
        }
    }

}