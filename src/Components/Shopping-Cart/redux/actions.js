import { ADD_TO_CART, DELETE_FROM_CART, LOAD_CURRENT_ITEM, UPDATE_QTY } from "./ActionsTypes"

export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        payload: {
            id: id
        }
    }
}

export const loadCurrentItem = (currentItem) => {
    return {
        type: LOAD_CURRENT_ITEM,
        payload: {
            currentItem: currentItem
        }
    }
}

export const deleteFromCart = (id) => {
    return {
        type: DELETE_FROM_CART,
        payload: {
            id: id
        }
    }
}

export const updateQty = (id, qty) => {
    return {
        type: UPDATE_QTY,
        payload: {
            id: id,
            qty: qty
        }
    }
}