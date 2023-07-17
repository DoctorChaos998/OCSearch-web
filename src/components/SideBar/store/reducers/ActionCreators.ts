import {AppDispatch} from "@/store";
import {userSlice} from "@/components/Auth/store/reducers/UserSlise";
import AuthService from "@/components/Auth/api/Api";

export const logout = () => async (dispatch: AppDispatch) =>{
    try {
        dispatch(userSlice.actions.userLogout())
        await AuthService.logout()
        localStorage.removeItem('token')
        dispatch(userSlice.actions.userLogoutSuccess())
    } catch (e: any) {
        dispatch(userSlice.actions.userLogoutError(e.response?.data?.message))
    }
}