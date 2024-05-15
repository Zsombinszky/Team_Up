import React from 'react'
import {Navbar} from "./component/index.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import ProfilePage from "./pages/ProfilePage.jsx";
import {UserList} from "./pages/UserList.jsx";
import {Home} from "./pages/Home.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar/>
                <div className="pages">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/profile/:id" element={<ProfilePage/>}></Route>
                        <Route path="/users" element={<UserList/>}></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );

}
export default App
