import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        message: '',
        products : [],
        phone: "",
        address: ''
    },
    reducers: {
        addProduct(state, action) {
            if (state.products.find(p => p.product._id === action.payload.product._id)) {
                state.products = state.products.map(p => {
                    console.log(p.product._id === action.payload.product._id)
                    return p.product._id === action.payload.product._id ? {
                        ...p,
                        qty: p.qty + 1
                    } : p
                }) 
            } else state.products = [...state.products, action.payload]
        },
        setCount(state, {payload}) {
            state.products = state.products.map(p => {
                return p.product._id === payload._id ? {
                    ...p,
                    qty: payload.qty
                } : p
            }) 
        },
        removeProduct(state, {payload}) {
            state.products = [...state.products.filter(p => p.product._id !== payload)]
        },
        setPhone(state, {payload}) {
            state.phone = payload
        },
        setAddress(state, {payload}) {
            state.address = payload
        },
        clearCart(state) {
            state.products = []
        }
    }
})

export const { addProduct, setCount, removeProduct, setPhone, setAddress, clearCart} = cartSlice.actions

export default cartSlice.reducer
