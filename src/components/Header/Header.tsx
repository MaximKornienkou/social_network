import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import style from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/redux-store";
import {getAuthMeTC, UserDataType} from "../../Redux/auth-reducer";


type HeaderPropsType = {
    title: string
}

function Header(props: HeaderPropsType) {

    const userAuth = useSelector<AppRootStateType, UserDataType>((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAuthMeTC())
    }, [dispatch]);

    return (
        <header className={style.header}>
            <img
                src="https://img.freepik.com/free-psd/logo-mockup-on-grey-wall_35913-2122.jpg?size=626&ext=jpg"
                alt="Fon"/>
            <div className={style.loginBlock}>
                {userAuth.isAuth ? userAuth.login : <NavLink to={"/login"}>Login</NavLink>}

            </div>
        </header>
    );
}

export default Header;