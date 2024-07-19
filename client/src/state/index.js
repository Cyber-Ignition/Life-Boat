import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    medname: null,
    cartitems: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state, action) => {
            state.user = null;
            state.token = null;
        },
        setMedName: (state, action) => {
            state.medname = action.payload.medname;
        },
        setCartItem: (state, action) => {
            state.cartitems.push(action.payload);
        },
        setCartItemRefresh: (state, action) => {
            state.cartitems = [];
        },
        setCartItemRemove: (state, action) => {
            const idx = state.cartitems.findIndex((item) => item === action.payload);
            console.log(idx);
            state.cartitems.splice(idx, 1);
        }
    }
})

export const { setMode, setLogin, setLogout, setMedName, setCartItem, setCartItemRefresh, setCartItemRemove } =
  authSlice.actions;
export default authSlice.reducer;