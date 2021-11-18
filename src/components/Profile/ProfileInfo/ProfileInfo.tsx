import React from "react";
import styles from "./ProfileInfo.module.css";

type ProfileInfoProps = {
    avatar: string;
    info: string;
    name: string;
}

function ProfileInfo(props: ProfileInfoProps) {
    return (
        <div>
            <div>
                <img className={styles.fon}
                     // src={"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"}
                     alt="Emblem"/>
            </div>
            <div className={styles.description}>
                <img className={styles.avatar}
                     src={props.avatar}
                     alt="Avatar"/>
                <div>{props.info}</div>
                <div>Name: {props.name}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;