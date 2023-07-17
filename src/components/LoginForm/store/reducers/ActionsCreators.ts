import {AppDispatch} from "@/store";
import {userSlice} from "@/components/Auth/store/reducers/UserSlise";
import AuthService from "@/components/Auth/api/Api";

export const login = (nickname:string, password: string, rememberMe: boolean) => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userLogin())
        const response = await AuthService.login(nickname, password, rememberMe)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userSlice.actions.userLoginSuccess(response.data.user))
    } catch (e: any) {
        dispatch(userSlice.actions.userLoginError(e.response?.data?.message))
    }
}