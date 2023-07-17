import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "@/entites/user/user";


interface IUserState {
    user: IUser
    isLoading: boolean
    error: string
    isAuth: boolean
    loginError: string
}

const initialState: IUserState = {
    user: {} as IUser,
    isLoading: true,
    error: '',
    isAuth: false,
    loginError: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state){
            state.isLoading = false
        },
        userLoginSuccess(state, action:PayloadAction<IUser>){
            state.isLoading = false
            state.loginError = ''
            state.user = action.payload
            state.isAuth = true
        },
        userLoginError(state, action:PayloadAction<string>){
            state.isLoading = false
            state.loginError = action.payload
        },
        userLogout(state){
            state.isLoading = true
        },
        userLogoutSuccess(state){
            state.isLoading = false
            state.error = ''
            state.user = {} as IUser
            state.isAuth = false
        },
        userLogoutError(state, action:PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
        userCheckAuth(state){
            state.isLoading = true
        },
        userCheckAuthSuccess(state, action:PayloadAction<IUser>){
            state.isLoading = false
            state.error = ''
            state.user = action.payload
            state.isAuth = true
        },
        userCheckAuthError(state, action:PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
        isLoadingFalse(state) {
            state.isLoading = false
        }
    }
})

export default userSlice.reducer