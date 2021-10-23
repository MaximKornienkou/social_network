import {v1} from "uuid";
import {ProfilePageType} from "./store";
import {AddNewMessageTextType, SendMessageActionType} from "./dialogs-reducer";

export type ActionTypesProfileReducer =
    AddPostActionType |
    NewPostTextActionType |
    AddNewMessageTextType |
    SendMessageActionType;

export type AddPostActionType = {
    type: "ADD-POST";
}
export type NewPostTextActionType = {
    type: "NEW-POST-TEXT";
    value: string;
}

export const profileReducer = (state: ProfilePageType, action: ActionTypesProfileReducer): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST":
            const newPost = {
                id: v1(), message: state.newPostText, likesCount: 14
            };
            state.posts.push(newPost);
            state.newPostText = "";
            return state;
        case "NEW-POST-TEXT":
            return {...state, newPostText: action.value};
        default:
            return state;
    }
}

export const addPostActionCreator = (): AddPostActionType => {
    return {
        type: "ADD-POST"
    }
}
export const newPostActionCreator = (value: string): NewPostTextActionType => {
    return {
        type: "NEW-POST-TEXT",
        value: value
    }
}