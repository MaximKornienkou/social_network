import React from "react";
import styles from "./Post.module.css";

type PostPropsType = {
    title: string
    message: string
    likesCount: number
}

function Post(props: PostPropsType) {
    return (
        <div className={styles.item}>
            <img src={"https://www.meme-arsenal.com/memes/8ab5fe07681cd172915e9472a0a8443d.jpg"} alt={"Avatar"}/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;