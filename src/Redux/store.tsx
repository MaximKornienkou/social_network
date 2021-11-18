import {v1} from "uuid"
import {profileReducer} from "./profile-reducer";
import {    dialogsReducer} from "./dialogs-reducer";

export type PostsType = {
    id: string;
    message: string;
    likesCount: number;
}
export type MessageDataType = {
    id: string;
    message: string;
}
export type UserDataType = {
    id: string;
    name: string;
    avatar: string;
}
export type ProfilePageType = {
    posts: Array<PostsType>;
    newPostText: string;
    profile: {};
}
export type DialogsPageType = {
    userData: Array<UserDataType>;
    messageData: Array<MessageDataType>;
    newMessageText: string;
}
export type RootStateType = {
    profilePage: ProfilePageType;
    dialogsPage: DialogsPageType;
    sidebar: string
}
export type DispatchType = (action:
                                any) => void;
export type StoreType = {
    _state: RootStateType;
    _rerenderEntireTree: () => void;
    subscribe: (rerenderEntireTree: () => void) => void;
    getState: () => RootStateType;
    dispatch: DispatchType;
}


const store: StoreType = {
    _state: {
        profilePage: {
            posts: [{id: v1(), message: "Hi, how are you?", likesCount: 12},
                {id: v1(), message: "My first post", likesCount: 9},
            ],
            newPostText: "",
            profile: "",
        },
        dialogsPage: {
            userData: [
                {
                    id: v1(),
                    name: "Maxim",
                    avatar: "https://i.pinimg.com/236x/73/b0/c0/73b0c08a5d1578cb976a00d8665ffd77--all-blacks-rugby-wutang.jpg"
                },
                {
                    id: v1(),
                    name: "Denis",
                    avatar: "https://i.pinimg.com/236x/73/b0/c0/73b0c08a5d1578cb976a00d8665ffd77--all-blacks-rugby-wutang.jpg"
                },
                {
                    id: v1(),
                    name: "Alexandra",
                    avatar: "https://i.pinimg.com/236x/73/b0/c0/73b0c08a5d1578cb976a00d8665ffd77--all-blacks-rugby-wutang.jpg"
                },
                {
                    id: v1(),
                    name: "Sasha",
                    avatar: "https://i.pinimg.com/236x/73/b0/c0/73b0c08a5d1578cb976a00d8665ffd77--all-blacks-rugby-wutang.jpg"
                },
                {
                    id: v1(),
                    name: "Viktor",
                    avatar: "https://i.pinimg.com/236x/73/b0/c0/73b0c08a5d1578cb976a00d8665ffd77--all-blacks-rugby-wutang.jpg"
                },
                {
                    id: v1(),
                    name: "Valera",
                    avatar: "https://i.pinimg.com/236x/73/b0/c0/73b0c08a5d1578cb976a00d8665ffd77--all-blacks-rugby-wutang.jpg"
                },
            ],
            messageData: [
                {id: v1(), message: "Hi"},
                {id: v1(), message: "How are you?"},
                {id: v1(), message: "My name is Sasha."},
                {id: v1(), message: "My name is Sasha too."},
                {id: v1(), message: "My name is Viktor."},
                {id: v1(), message: "My name is Valera."},
            ],
            newMessageText: ""
        },
        sidebar: "",
    },
    _rerenderEntireTree() {
    },
    subscribe(observer: () => void) {
        this._rerenderEntireTree = observer;
    },
    getState() {
        return this._state
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

        this._rerenderEntireTree();
    }
}

export default store;
