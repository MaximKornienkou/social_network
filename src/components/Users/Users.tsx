import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/redux-store";
import {followAC, setUsersAC, unFollowAC, UsersType} from "../../Redux/users-reducer";
import styles from "./Users.module.css"
import axios from "axios";

export function Users() {

    const usersState = useSelector<AppRootStateType, UsersType>((state) => state.usersPage)
    const dispatch = useDispatch()

    if (usersState.users.length === 0) {

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${usersState.currentPage}&count=${usersState.pageSize}`)
            .then((response: any) => {
                    dispatch(setUsersAC(response.data.items))
                }
            )

        // dispatch(setUsersAC([
        //     {
        //         id: v1(),
        //         avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lTn4YOuayj63G5yuQ2DohGT4BN_AnZ2sTQ&usqp=CAU",
        //         fullName: "Maxim",
        //         status: "I am learning JS",
        //         follow: false,
        //         location: {
        //             country: "Ukraine", city: "Pokrovsk",
        //         },
        //     },
        //     {
        //         id: v1(),
        //         avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lTn4YOuayj63G5yuQ2DohGT4BN_AnZ2sTQ&usqp=CAU",
        //         fullName: "Den",
        //         status: "I am working",
        //         follow: false,
        //         location: {
        //             country: "Ukraine", city: "Kharkiv",
        //         },
        //     },
        //     {
        //         id: v1(),
        //         avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lTn4YOuayj63G5yuQ2DohGT4BN_AnZ2sTQ&usqp=CAU",
        //         fullName: "Alexandra",
        //         status: "I am learning HTML",
        //         follow: false,
        //         location: {
        //             country: "Ukraine", city: "Pokrovsk",
        //         },
        //     },
        // ]))
    }

    const onClickUnfollow = (userId: string) => {
        dispatch(unFollowAC(userId))
    }
    const onClickFollow = (userId: string) => {
        dispatch(followAC(userId))
    }

    const pagesCount = Math.ceil(usersState.totalUsersCount / usersState.pageSize);

    const usersPagesCount = [];

    for (let i = 1; i <= pagesCount; i++) {
        usersPagesCount.push(i)
    }

    return (
        <div>
            {usersPagesCount.map((page) => {
                return (
                    <span className={usersState.currentPage === page
                        ? styles.selectedPage : ""}>{page}</span>
                )
            })}
            {usersState.users.map((user) => <div key={user.id}>
                <span>
                    <div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lTn4YOuayj63G5yuQ2DohGT4BN_AnZ2sTQ&usqp=CAU"
                            alt="Avatar"
                            className={styles.avatar}
                        />
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
    )

}