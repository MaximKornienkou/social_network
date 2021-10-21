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
import {DispatchType, StoreType} from "./Redux/state";
import {v1} from "uuid";

type AppPropsType = {
    store: StoreType;
    dispatch: DispatchType;
}

function App(props: AppPropsType) {
    const state = props.store.getState();
    return (
        <div className="app-wrapper">
            <Header title={"Header"}/>
            <Navbar title={"Navbar"}/>
            <div className="app-wrapper-content">
                <Route path="/dialogs" render={() => <Dialogs state={state.dialogsPage} id={v1()}
                                                              messageText={state.dialogsPage.newMessageText}
                                                              dispatch={props.dispatch.bind(props.store)}/>} />
                <Route path="/profile" render={() => <Profile title={"title"}
                                                              state={state.profilePage}
                                                              dispatch={props.dispatch.bind(props.store)}/>}/>
                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/settings" component={Settings}/>
            </div>
        </div>
    );
}

export default App;
