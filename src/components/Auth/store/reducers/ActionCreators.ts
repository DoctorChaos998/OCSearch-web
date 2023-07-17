import {userSlice} from "./UserSlise";
import AuthService from "@/components/Auth/api/Api";
import {AppDispatch} from "@/store";




// export const registration = (nickname:string, password: string) => async (dispatch: AppDispatch) =>{
//     try {
//         dispatch(userSlice.actions.userRegistration())
//         const response = await AuthService.registration(nickname, password)
//         localStorage.setItem('token', response.data.accessToken)
//         dispatch(userSlice.actions.userRegistrationSuccess(response.data.user))
//     } catch (e: any) {
//         dispatch(userSlice.actions.userRegistrationError(e.response?.data?.message))
//     }
// }



export const checkAuth = () => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userCheckAuth())
        const response = await AuthService.checkAuth()
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userSlice.actions.userCheckAuthSuccess(response.data.user))
    } catch (e: any) {
        dispatch(userSlice.actions.userCheckAuthError(e.response?.data?.message))
    }
}

export const setLoadingFalse =() => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.isLoadingFalse())
}