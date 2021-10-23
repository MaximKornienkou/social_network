import {v1} from "uuid";
import {DialogsPageType} from "./store";
import {AddPostActionType, NewPostTextActionType} from "./profile-reducer";


export type ActionTypesDialogsReducer =
    AddPostActionType |
    NewPostTextActionType |
    AddNewMessageTextType |
    SendMessageActionType;

export type AddNewMessageTextType = {
    type: "NEW-MESSAGE-TEXT";
    messageText: string;
}
export type SendMessageActionType = {
    type: "SEND-MESSAGE";
}

export const dialogsReducer = (state: DialogsPageType, action: ActionTypesDialogsReducer): DialogsPageType => {

    switch (action.type) {
        case "NEW-MESSAGE-TEXT":
            return {...state, newMessageText: action.messageText};
        case "SEND-MESSAGE":
            state.messageData.push({id: v1(), message: state.newMessageText});
            state.newMessageText = "";
            return state;
        default:
            return state;
    }
}

export const addNewMessageTextCreator = (messageText: string): AddNewMessageTextType => {
    return {
        type: "NEW-MESSAGE-TEXT",
        messageText
    }
}
export const sendMessageCreator = (): SendMessageActionType => {
    return {
        type: "SEND-MESSAGE",
    }
}