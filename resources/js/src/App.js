import React,{useState,Component} from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ShowCreatePosts from "./components/Posts/create";
import ShowPosts from "./components/Posts/show";


const App = () =>(
    <BrowserRouter className="app__container">
        <Navbar />
        <div className="app p-3 container-fluid">
            <Switch>
                <Route path={"/posts"} exact>
                    <ShowPosts />
                </Route>
                <Route path={"/posts/create"}>
                    <ShowCreatePosts />
                </Route>
            </Switch>
        </div>
    </BrowserRouter>
)


if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
