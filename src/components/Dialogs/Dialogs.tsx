import React, {ChangeEvent} from "react";
import styles from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {Button, TextField} from "@material-ui/core";
import {addNewMessageTextCreator, DialogsPageType, sendMessageCreator} from "../../Redux/dialogs-reducer";
import {useDispatch} from "react-redux";

type DialogsPropsType = {
    id: string;
    state: DialogsPageType;
    messageText: string;
}

export function Dialogs(props: DialogsPropsType) {

    const dispatch = useDispatch()
    const sendMessageOnClick = () => {
        dispatch(sendMessageCreator());
    }
    const addNewMessageText = (event: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(addNewMessageTextCreator(event.currentTarget.value));
    }
    const dialogsElements = props.state.userData.map(user => <DialogItem name={user.name} id={user.id} key={user.id}
                                                                         avatar={user.avatar}/>);
    const messagesElements = props.state.messageData.map(message => <Message message={message.message}
                                                                             key={message.id}/>);

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                {messagesElements}
            </div>
            <div>
                <TextField onChange={addNewMessageText} value={props.messageText}/>
                <Button onClick={sendMessageOnClick}>Send message</Button>
            </div>
        </div>
    )
}


