import React from "react";
import style from './Settings.module.css';

type SettingsPropsType = {
    title: string
}
function Settings(props: SettingsPropsType) {
    return (
        <div className={style.settings}>
            Settings
        </div>
    )
}

export default Settings;