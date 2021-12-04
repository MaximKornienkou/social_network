import {Dispatch} from "redux";
import {usersAPI} from "../api/api-request";

export type UsersType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    disableFollowUnfollowButton: Array<number>,
}
export type UserType = {
    name: string,
    id: number,
    photos: UserPhotosType,
    status: string,
    followed: boolean,
}

export type UserPhotosType = {
    small: string,
    large: string,
}


export type ActionsTypes =
    ReturnType<typeof followAC> |
    ReturnType<typeof unFollowAC> |
    ReturnType<typeof setUsersAC> |
    ReturnType<typeof setCurrentPageAC> |
    ReturnType<typeof dataIsFetchingAC> |
    ReturnType<typeof disableFollowUnfollowButtonAC>;

const initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: true,
    disableFollowUnfollowButton: [],
}

export const usersReducer = (state = initialState, action: ActionsTypes): UsersType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state, users: state.users.map((user) =>
                    user.id === action.userId ? {...user, followed: true} : user)
            };
        case "UNFOLLOW":
            return {
                ...state, users: state.users.map((user) =>
                    user.id === action.userId ? {...user, followed: false} : user)
            };
        case "SET-USERS":
            return {...state, users: [...action.users]};
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage};
        case "DATA-IS-FETCHING":
            return {...state, isFetching: action.isFetching};
        case "DISABLE-FOLLOW/UNFOLLOW-BUTTON":
            return {
                ...state,
                disableFollowUnfollowButton:
                    [...state.disableFollowUnfollowButton
                        .filter(id => id === action.id)]
            }
        default:
            return state;
    }
}

export const followAC = (userId: number) => {
    return {
        type: "FOLLOW",
        userId,
    } as const
}
export const unFollowAC = (userId: number) => {
    return {
        type: "UNFOLLOW",
        userId,
    } as const
}
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: "SET-USERS",
        users,
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: "SET-CURRENT-PAGE",
        currentPage,
    } as const
}
export const dataIsFetchingAC = (isFetching: boolean) => {
    return {
        type: "DATA-IS-FETCHING",
        isFetching,
    } as const
}
export const disableFollowUnfollowButtonAC = (id: number) => {
    return {
        type: "DISABLE-FOLLOW/UNFOLLOW-BUTTON",
        id,
    } as const
}

export const getUsersTC = (currentPage: number, pageSize: number) =>
    (dispatch: Dispatch<ActionsTypes>) => {
        usersAPI.getUsers(currentPage, pageSize)
            .then((data) => {
                dispatch(dataIsFetchingAC(false));
                dispatch(setUsersAC(data.items));
            })
    }
export const followUserTC = (userId: number) =>
    (dispatch: Dispatch<ActionsTypes>) => {
        usersAPI.followUser(userId)
            .then((data) => {
                if (data.resultCode === 0) {
                    dispatch(followAC(userId));
                }
                dispatch(disableFollowUnfollowButtonAC(0));
            })
    }
export const unfollowUserTC = (userId: number) =>
    (dispatch: Dispatch<ActionsTypes>) => {
        usersAPI.unfollowUser(userId)
            .then((data) => {
                if (data.resultCode === 0) {
                    dispatch(unFollowAC(userId));
                }
                dispatch(disableFollowUnfollowButtonAC(0));
            })
    }