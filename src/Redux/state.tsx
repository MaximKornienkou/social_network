import { v1 } from "uuid"

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
}
export type DialogsPageType = {
    userData: Array<UserDataType>;
    messageData: Array<MessageDataType>;
    newMessageText: string;
}
export type RootStateType = {
    profilePage: ProfilePageType;
    dialogsPage: DialogsPageType;

}
export type DispatchType = (action:
                                AddPostActionType |
                                NewPostTextActionType |
                                AddNewMessageTextCreatorType |
                                SendMessageCreatorType) => void;
export type StoreType = {
    _state: RootStateType;
    _rerenderEntireTree: () => void;
    subscribe: (rerenderEntireTree: () => void) => void;
    getState: () => RootStateType;
    dispatch: DispatchType;
}
export type AddPostActionType = {
    type: "ADD-POST";
}
export type AddNewMessageTextCreatorType = {
    type: "NEW-MESSAGE-TEXT";
    messageText: string;
}
export type SendMessageCreatorType = {
    type: "SEND-MESSAGE";
}
export type NewPostTextActionType = {
    type: "NEW-POST-TEXT";
    value: string;
}

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [{id: v1(), message: "Hi, how are you?", likesCount: 12},
                {id: v1(), message: "My first post", likesCount: 9},
            ],
            newPostText: ""
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
        }
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
        if (action.type === "ADD-POST") {
            const newPost = {
                id: v1(), message: this._state.profilePage.newPostText, likesCount: 14
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = "";
            this._rerenderEntireTree();
        } else if (action.type === "NEW-POST-TEXT") {
            this._state.profilePage.newPostText = action.value;
            this._rerenderEntireTree();
        } else if (action.type === "SEND-MESSAGE") {
            this._state.dialogsPage.messageData.push({id: v1(), message: this._state.dialogsPage.newMessageText});
            this._state.dialogsPage.newMessageText = "";
            this._rerenderEntireTree();
        } else if (action.type === "NEW-MESSAGE-TEXT") {
            this._state.dialogsPage.newMessageText = action.messageText;
            this._rerenderEntireTree();
        }
    }
}

export const addPostActionCreator = (): AddPostActionType => {
    return {
        type: "ADD-POST"
    }
}

export const addNewMessageTextCreator = (messageText: string): AddNewMessageTextCreatorType => {
    return {
        type: "NEW-MESSAGE-TEXT",
        messageText: messageText
    }
}
export const sendMessageCreator = (): SendMessageCreatorType => {
    return {
        type: "SEND-MESSAGE",
    }
}


export const newPostActionCreator = (value: string): NewPostTextActionType => {
    return {
        type: "NEW-POST-TEXT",
        value: value
    }
}

export default store;

//____________________________________________________
// addNewPost(value: string) {
//     const newPost = {
//         id: 3, message: value, likesCount: 14
//     };
//     this._state.profilePage.posts.push(newPost);
//     this._state.profilePage.newPostText = "";
//     this._rerenderEntireTree();
// },
// newPostText(value: string) {
//     this._state.profilePage.newPostText = value;
//     this._rerenderEntireTree();
// },