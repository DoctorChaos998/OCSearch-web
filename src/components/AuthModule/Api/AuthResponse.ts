import {IUser} from "@/entites/user/user";

export interface IAuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}
