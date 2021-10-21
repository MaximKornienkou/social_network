import React from "react";
import s from './Header.module.css';
type HeaderPropsType = {
    title: string
}

function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <img
                src="https://img.freepik.com/free-psd/logo-mockup-on-grey-wall_35913-2122.jpg?size=626&ext=jpg" alt="Fon"/>
        </header>
    );
}

export default Header;