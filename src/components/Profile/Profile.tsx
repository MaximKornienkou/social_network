import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../Redux/profile-reducer";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setUserProfileAC} from "../../Redux/profile-reducer";
import {AppRootStateType} from "../../Redux/redux-store";

type ProfilePropsType = {
    title: string;
    state: ProfilePageType;
    user: any,
}

function Profile(props: ProfilePropsType) {

    const userProfile = useSelector<AppRootStateType, ProfilePageType>((state) => state.profilePage);
    const dispatch = useDispatch();

    let userId = props.user.match.params.userId;
    if (!userId) {
        userId = 20390;
    }
    useEffect(() => {
        //if (userProfile.profile) {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`, {
            withCredentials: true,
            headers: {
                "API-KEY": "59351494-37f1-4114-8206-923aa7d46da6",
            }
        })
            .then((response: any) => {
                    dispatch(setUserProfileAC(response.data));
                }
            )
        //}
    }, []);


    const fullName = userProfile.profile ? userProfile.profile.fullName : "";

    return (
        <div>
            <ProfileInfo info={"Description"}
                         avatar={"https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"}
                //avatar={"https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"}
                         name={fullName}
            />
            {/*avatar={"https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"}/>*/}
            <MyPosts title={"My post"} posts={props.state.posts}
                     postText={props.state.newPostText}/>
        </div>
    )
}

export default Profile;