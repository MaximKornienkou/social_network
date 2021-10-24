import {v1} from "uuid";

export type MessageDataType = {
    id: string;
    message: string;
}
export type UserDataType = {
    id: string;
    name: string;
    avatar: string;
}
export type DialogsPageType = {
    userData: Array<UserDataType>;
    messageData: Array<MessageDataType>;
    newMessageText: string;
}

export type ActionTypesDialogsReducer =
    ReturnType<typeof addNewMessageTextCreator> |
    ReturnType<typeof sendMessageCreator>;

const initialState = {
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

export const dialogsReducer = (state: DialogsPageType = initialState,
                               action: ActionTypesDialogsReducer): DialogsPageType => {
    switch (action.type) {
        case "NEW-MESSAGE-TEXT":
            return {...state, newMessageText: action.messageText};
        case "SEND-MESSAGE":
            return {
                ...state,
                messageData: [...state.messageData, {id: v1(), message: state.newMessageText}],
                newMessageText: ""
            };
        default:
            return state;
    }
}

export const addNewMessageTextCreator = (messageText: string) => {
    return {
        type: "NEW-MESSAGE-TEXT",
        messageText
    } as const
}
export const sendMessageCreator = () => {
    return {
        type: "SEND-MESSAGE",
    } as const
}