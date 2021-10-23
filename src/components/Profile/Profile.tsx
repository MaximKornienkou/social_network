import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../Redux/profile-reducer";

type ProfilePropsType = {
    title: string;
    state: ProfilePageType;
}

function Profile(props: ProfilePropsType) {

    return (
        <div>
            <ProfileInfo info={"Description"}
                         avatar={"https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"}/>
            <MyPosts title={"My post"} posts={props.state.posts}
                     postText={props.state.newPostText}/>
        </div>
    )
}

export default Profile;