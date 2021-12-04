import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/redux-store";
import {
    dataIsFetchingAC, disableFollowUnfollowButtonAC,
    followUserTC, getUsersTC,
    setCurrentPageAC,
    unfollowUserTC,
    UsersType
} from "../../Redux/users-reducer";
import styles from "./Users.module.css"
import {Preloader} from "../Preloader/Preloader";
import {NavLink} from "react-router-dom";


export function Users() {

    const usersState = useSelector<AppRootStateType, UsersType>((state) => state.usersPage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (usersState.users.length === 0) {
            dispatch(getUsersTC(usersState.currentPage, usersState.pageSize))
        }
    }, [usersState.users.length, dispatch, usersState.currentPage, usersState.pageSize])

    const onClickSetCurrentPage = (page: number) => {
        dispatch(dataIsFetchingAC(true));
        dispatch(setCurrentPageAC(page));
        dispatch(getUsersTC(page, usersState.pageSize))
    }

    const onClickUnfollow = (userId: number) => {
        dispatch(disableFollowUnfollowButtonAC(userId));
        dispatch(unfollowUserTC(userId));
    }
    const onClickFollow = (userId: number) => {
        dispatch(disableFollowUnfollowButtonAC(userId));
        dispatch(followUserTC(userId));
    }

    const pagesCount = Math.ceil(usersState.totalUsersCount / usersState.pageSize);

    const usersPagesCount = [];

    for (let i = 1; i <= pagesCount; i++) {
        usersPagesCount.push(i);
    }

    return (
        <>
            {usersState.isFetching ? <Preloader/> : null}
            <div>
                {usersPagesCount.map((page) => {
                    return (
                        <span className={usersState.currentPage === page
                            ? styles.selectedPage : ""}
                              onClick={() => onClickSetCurrentPage(page)}
                              key={page}
                        >{page}
                        </span>
                    )
                })}
                {usersState.users.map((user) =>
                        <div key={user.id}>
                <span>
                    <div>
                        <NavLink to={`/profile/${user.id}`}>
                            <img
                                src={user.photos.small
                                    ? user.photos.small
                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lTn4YOuayj63G5yuQ2DohGT4BN_AnZ2sTQ&usqp=CAU"}
                                alt="Avatar"
                                className={styles.avatar}
                            />
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={usersState.disableFollowUnfollowButton.some(id => id === user.id)}
                                      onClick={() => onClickUnfollow(user.id)}>Unfollow</button>
                            : <button disabled={usersState.disableFollowUnfollowButton.some(id => id === user.id)}
                                      onClick={() => onClickFollow(user.id)}>Follow</button>}
                    </div>
                </span>
                            <div>
                                {user.name}
                            </div>
                            <div>
                                {user.status}
                            </div>
                        </div>
                )}
            </div>
        </>
    )

}