import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../Redux/profile-reducer";
import axios from "axios";
import {useDispatch} from "react-redux";
import { setUserProfileAC } from "../../Redux/profile-reducer";

type ProfilePropsType = {
    title: string;
    state: ProfilePageType;
}

function Profile(props: ProfilePropsType) {

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users/20390`)
            .then((response: any) => {
                    dispatch(setUserProfileAC(response.data));
                }
            )
    }, [])


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