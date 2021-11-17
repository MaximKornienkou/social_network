import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/redux-store";
import {
    dataIsFetchingAC,
    followAC,
    setCurrentPageAC,
    setUsersAC,
    unFollowAC,
    UsersType
} from "../../Redux/users-reducer";
import styles from "./Users.module.css"
import axios from "axios";
import {Preloader} from "../Preloader/Preloader";
import {NavLink} from "react-router-dom";

export function Users() {

    const usersState = useSelector<AppRootStateType, UsersType>((state) => state.usersPage);
    const dispatch = useDispatch();

    if (usersState.users.length === 0) {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${usersState.currentPage}&count=${usersState.pageSize}`)
            .then((response: any) => {
                    dispatch(dataIsFetchingAC(false));
                    dispatch(setUsersAC(response.data.items));
                }
            )
    }

    const onClickUnfollow = (userId: string) => {
        dispatch(unFollowAC(userId));
    }
    const onClickFollow = (userId: string) => {
        dispatch(followAC(userId));
    }
    const onClickSetCurrentPage = (page: number) => {
        dispatch(dataIsFetchingAC(true));
        dispatch(setCurrentPageAC(page));
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${usersState.pageSize}`)
            .then((response: any) => {
                    dispatch(dataIsFetchingAC(false));
                    dispatch(setUsersAC(response.data.items));
                }
            )
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
                              onClick={() => onClickSetCurrentPage(page)}>{page}</span>
                    )
                })}
                {usersState.users.map((user) => <div key={user.id}>
                <span>
                    <div>
                        <NavLink to={`/profile/${user.id}`}>
                            <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lTn4YOuayj63G5yuQ2DohGT4BN_AnZ2sTQ&usqp=CAU"
                            alt="Avatar"
                            className={styles.avatar}
                            />
                        </NavLink>
                    </div>
                    <div>
                        {user.follow
                            ? <button onClick={() => onClickUnfollow(user.id)}>Unfollow</button>
                            : <button onClick={() => onClickFollow(user.id)}>Follow</button>}
                    </div>
                </span>
                    <span>
                    <span>
                        <div>
                            {user.name}
                        </div>
                        <div>
                            {user.status}
                        </div>
                    </span>
                    <span>
                        <div>
                            {"user.location.country"}
                        </div>
                        <div>
                            {"user.location.city"}
                        </div>
                    </span>
                </span>
                </div>)}
            </div>
        </>
    )

}