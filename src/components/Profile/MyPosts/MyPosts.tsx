import React, {ChangeEvent} from "react";
import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostActionCreator, newPostActionCreator} from "../../../Redux/profile-reducer";
import {useDispatch} from "react-redux";

type PostsType = {
    id: string;
    message: string;
    likesCount: number;
}

type MyPostsPropsType = {
    title: string;
    posts: Array<PostsType>;
    postText: string;
}

function MyPosts(props: MyPostsPropsType) {
    const dispatch = useDispatch()
    const postsElements = props.posts.map(posts => <Post
        key={posts.id}
        title={"Post"}
        message={posts.message}
        likesCount={posts.likesCount}/>);
    const addPostOnClick = () => {
        dispatch(addPostActionCreator());
    }
    const newTextChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(newPostActionCreator(event.currentTarget.value));
    }

    return (
        <div className={styles.myPosts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={newTextChangeHandler} value={props.postText}/>
                </div>
                <div>
                    <button onClick={addPostOnClick}>Add post</button>
                    <button>Remove</button>
                </div>
            </div>
            <div className={styles.posts}>
            </div>
            {postsElements}
        </div>
    )
}

export default MyPosts;