import React from "react";
import {NavLink} from "react-router-dom";
import styles from '../Dialogs.module.css';

type DialogItemPropsType = {
    name: string;
    id: string;
    avatar: string;
}

function DialogItem(props: DialogItemPropsType) {
    let path = "/dialogs/" + props.id;
    return (
        <div className={styles.dialog}>
            <NavLink to={path}>
                <img src={props.avatar} alt={"Avatar"}/>{props.name}
            </NavLink>
        </div>
    )
}

export default DialogItem;