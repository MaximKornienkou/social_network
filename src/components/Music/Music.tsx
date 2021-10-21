import React from "react";
import style from './Music.module.css';

type MusicPropsType = {
    title: string
}
function Music(props: MusicPropsType) {
    return (
        <div className={style.music}>
            Music
        </div>
    )
}




export default Music;