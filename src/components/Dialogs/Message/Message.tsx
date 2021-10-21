import React from "react";
import styles from '../Dialogs.module.css';

type MessagePropsType = {
    message: string;
}

function Message(props: MessagePropsType) {
    return (
        <div className={styles.message}>{props.message}</div>
    )
}



export default Message;