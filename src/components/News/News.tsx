import React from "react";
import style from './News.module.css';

type NewsPropsType = {
    title: string
}
function News(props: NewsPropsType) {
    return (
        <div className={style.news}>
            News
        </div>
    )
}




export default News;