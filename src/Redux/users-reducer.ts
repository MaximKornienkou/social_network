export type UsersType = {
    users: Array<UserType>,
}
type UserType = {
    id: string,
    avatar: string,
    name: string,
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
    users: [],
}

export const usersReducer = (state = initialState, action: ActionsTypes): UsersType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state, users: state.users.map((user) =>
                    user.id === action.userId ? {...user, follow: true} : user)
            }
        case "UNFOLLOW":
            return {
                ...state, users: state.users.map((user) =>
                    user.id === action.userId ? {...user, follow: false} : user)
            };
        case "SET-USERS":
            return {...state, users: [...state.users, ...action.users]}
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