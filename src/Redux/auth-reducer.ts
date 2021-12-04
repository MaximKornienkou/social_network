import {Dispatch} from "redux";
import {authAPI} from "../api/api-request";

export type UserDataType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

export type ActionsTypes = ReturnType<typeof setUserDataAC>;

const initialState: UserDataType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state = initialState, action: ActionsTypes): UserDataType => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {...state, ...action.data, isAuth: true};
        default:
            return state;
    }
}

export const setUserDataAC = (userId: number | null, email: string | null, login: string | null) => {
    return {
        type: "SET-USER-DATA",
        data: {
            userId,
            email,
            login,
        }
    } as const
}

export const getAuthMeTC = () =>
    (dispatch: Dispatch<ActionsTypes>) => {
        authAPI.getAuthMe()
            .then((response) => {
                if (response.resultCode === 0) {
                    let {userId, email, login} = response.data
                    dispatch(setUserDataAC(userId, email, login))
                }
            })
    }