import {v1} from "uuid";

export type PostsType = {
    id: string;
    message: string;
    likesCount: number;
}

export type ProfilePageType = {
    posts: Array<PostsType>;
    newPostText: string;
}

export type ActionTypesProfileReducer =
    ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof newPostActionCreator>;

const initialState = {
    posts: [{id: v1(), message: "Hi, how are you?", likesCount: 12},
        {id: v1(), message: "My first post", likesCount: 9},
    ],
    newPostText: ""
}

export const profileReducer = (state = initialState,
                               action: ActionTypesProfileReducer): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST":
            const newPost = {
                id: v1(), message: state.newPostText, likesCount: 14
            };
            const newState = {...state};
            newState.posts.push(newPost);
            newState.newPostText = "";
            return newState;
        case "NEW-POST-TEXT":
            return {...state, newPostText: action.value};
        default:
            return state;
    }
}

export const addPostActionCreator = () => {
    return {
        type: "ADD-POST"
    } as const
}
export const newPostActionCreator = (value: string) => {
    return {
        type: "NEW-POST-TEXT",
        value
    } as const
}