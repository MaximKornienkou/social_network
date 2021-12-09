import axios from "axios";
import {UserType} from "../Redux/users-reducer";
import {UserDataType} from "../Redux/auth-reducer";
import {ProfileInfoType} from "../Redux/profile-reducer";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0`,
    withCredentials: true,
    headers: {
        "API-KEY": "59351494-37f1-4114-8206-923aa7d46da6",
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponseType>(`/users?page=${currentPage}&count=${pageSize}`)
            .then((response) => {
                return response.data;
            })
    },
    followUser(userId: number) {
        return instance.post<FollowUnfollowResponseType>(`/follow/${userId}`)
            .then((response) => {
                return response.data;
            })
    },
    unfollowUser(userId: number) {
        return instance.delete<FollowUnfollowResponseType>(`/follow/${userId}`)
            .then((response) => {
                return response.data;
            })
    },
}

export type GetUsersResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: null,
}
export type FollowUnfollowResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {},
}

export const authAPI = {
    getAuthMe() {
        return instance.get<GetAuthMeResponseType>(`/auth/me`)
            .then((response) => {
                return response.data
            })
    }
}
export type GetAuthMeResponseType = {
    resultCode: number,
    messages: [],
    data: UserDataType,
}

export const profileAPI = {
    getProfileInfo(userId: number) {
        return instance.get<ProfileInfoType>(`/profile/${userId}`)
            .then((response: any) => {
                   return response;

                }

            )
    }
}
