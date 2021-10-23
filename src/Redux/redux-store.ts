import {combineReducers, createStore} from "redux";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";

const reducers = combineReducers({
    profileReducer,
    dialogsReducer
});

export const store = createStore()