import {v1} from "uuid";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api-request";

export type PostsType = {
    id: string;
    message: string;
    likesCount: number;
}

export type ProfilePageType = {
    posts: Array<PostsType>;
    newPostText: string;
    profile: ProfileInfoType | null;
}

export type ProfileInfoType = {
    aboutMe: string | null,
    contacts: ProfileContactsType,
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    photos: ProfilePhotosType,
    userId: number
}

export type ProfileContactsType = {
    facebook: string | null,
    github: string | null,
    instagram: string | null,
    mainLink: string | null,
    twitter: string | null,
    vk: string | null,
    website: string | null,
    youtube: string | null,
}
export type ProfilePhotosType = {
    large: string | null,
    small: string | null,
}

export type ActionTypesProfileReducer =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof newPostActionCreator> |
    ReturnType<typeof setUserProfileAC>;

const initialState: ProfilePageType = {
    posts: [{id: v1(), message: "Hi, how are you?", likesCount: 12},
        {id: v1(), message: "My first post", likesCount: 9},
    ],
    newPostText: "",
    profile: null
}

export const profileReducer = (state = initialState,
                               action: ActionTypesProfileReducer): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST":
            return {
                ...state,
                posts: [...state.posts, {id: v1(), message: state.newPostText, likesCount: 14}],
                newPostText: ""
            };
        case "NEW-POST-TEXT":
            return {...state, newPostText: action.value};
        case "SET-USER-PROFILE":
            return {...state, profile: action.userProfile};
        default:
            return state;
    }
}

export const addPostActionCreator = () => {
    return {
        type: "ADD-POST",
    } as const
}
export const newPostActionCreator = (value: string) => {
    return {
        type: "NEW-POST-TEXT",
        value,
    } as const
}
export const setUserProfileAC = (userProfile: ProfileInfoType) => {
    return {
        type: "SET-USER-PROFILE",
        userProfile,
    } as const
}

export const getProfileInfoTC = (userId: number) =>
    (dispatch: Dispatch<ActionTypesProfileReducer>) => {
        profileAPI.getProfileInfo(userId)
            .then((data) => {
                dispatch(setUserProfileAC(data.data));
            })
    }


// {
//     aboutMe: null,
//         fullName: null,
//     contacts: {
//     facebook: null,
//         github: null,
//         vk: null,
//         instagram: null,
//         mainLink: null,
//         twitter: null,
//         website: null,
//         youtube: null,
// },
//     lookingForAJob: false,
//         lookingForAJobDescription: null,
//     photos: {
//     small: null,
//         large: null,
// },
//     userId: 20390
// },
