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
}

function Profile(props: ProfilePropsType) {

    const userProfile = useSelector<AppRootStateType, ProfilePageType>((state) => state.profilePage);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/20315`)
            .then((response: any) => {
                    dispatch(setUserProfileAC(response.data));
                }
            )
    }, []);

    const fullName = userProfile.profile ? userProfile.profile.fullName : "";
    return (
        <div>
            <ProfileInfo info={"Description"}
                         avatar={"https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"}
                         name={fullName}
            />
            {/*avatar={"https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg"}/>*/}
            <MyPosts title={"My post"} posts={props.state.posts}
                     postText={props.state.newPostText}/>
        </div>
    )
}

export default Profile;