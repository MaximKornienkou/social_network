import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route} from 'react-router-dom';
import {v1} from "uuid";
import {AppRootStateType} from "./Redux/redux-store";
import {useSelector} from "react-redux";
import {DialogsPageType} from "./Redux/dialogs-reducer";
import {ProfilePageType} from "./Redux/profile-reducer";
import {Users} from "./components/Users/Users";
import {Login} from "./components/Login/Login";

function App() {

    const dialogsState = useSelector<AppRootStateType, DialogsPageType>((state) => state.dialogsPage)
    const profileState = useSelector<AppRootStateType, ProfilePageType>((state) => state.profilePage)

    return (
        <div className="app-wrapper">
            <Header title={"Header"}/>
            <Navbar title={"Navbar"}/>
            <div className="app-wrapper-content">
                <Route path="/dialogs" render={() => <Dialogs state={dialogsState} id={v1()}
                                                              messageText={dialogsState.newMessageText}
                />}/>
                <Route path="/profile/:userId?" render={(user) => <Profile title={"title"}
                                                                            state={profileState}
                                                                            user={user}
                />}/>
                <Route path="/users" render={() => <Users/>}/>
                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/login" component={Login}/>
            </div>
        </div>
    );
}

export default App;
