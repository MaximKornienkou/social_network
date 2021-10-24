import {v1} from "uuid";

export type UsersType = {
    users: Array<UserType>,
}
type UserType = {
    id: string,
    fullName: string,
    status: string,
    follow: boolean,
    location: LocationType,
}
type LocationType = {
    country: string,
    city: string,
}

export type ActionsTypes =
    ReturnType<typeof followAC> |
    ReturnType<typeof unFollowAC> |
    ReturnType<typeof setUsersAC>

const initialState: UsersType = {
    users: [
        {
            id: v1(),
            fullName: "Maxim",
            status: "I am learning JS",
            follow: true,
            location: {
                country: "Ukraine",
                city: "Pokrovsk",
            },
        },
        {
            id: v1(),
            fullName: "Den",
            status: "I am working",
            follow: false,
            location: {
                country: "Ukraine",
                city: "Kharkiv",
            },
        },
        {
            id: v1(),
            fullName: "Alexandra",
            status: "I am learning HTML",
            follow: true,
            location: {
                country: "Ukraine",
                city: "Pokrovsk",
            },
        },
    ],
}

export const usersReducer = (state = initialState, action: ActionsTypes): UsersType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state, users: state.users.map((user) =>
                    user.id === action.userId ? {...user, follow: true} : user)
            };
        case "UNFOLLOW":
            return {
                ...state, users: state.users.map((user) =>
                    user.id === action.userId ? {...user, follow: false} : user)
            };
        case "SET-USERS":
            return {...state, users:[...state.users, ...action.users]}
        default:
            return state;
    }
}

export const followAC = (userId: string) => {
    return {
        type: "FOLLOW",
        userId,
    } as const
}
export const unFollowAC = (userId: string) => {
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