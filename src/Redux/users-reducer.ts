export type UsersType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
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
    ReturnType<typeof setUsersAC> |
    ReturnType<typeof setCurrentPageAC> |
    ReturnType<typeof dataIsFetchingAC>;

const initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: true,
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
            return {...state, users: [...action.users]};
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage};
        case "DATA-IS-FETCHING":
            return {...state, isFetching: action.isFetching};
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

