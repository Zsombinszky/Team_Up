import {Navbar} from "./component/index.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import ProfilePage from "./pages/ProfilePage.jsx";
import {UserList} from "./pages/UserList.jsx";
import {Home} from "./pages/Home.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import GuildsPage from "./pages/GuildsPage.jsx";
import GuildDetailsPage from "./pages/GuildDetailsPage.jsx";
import MyFeedbacks from "./pages/MyFeedbacks.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminFeedbacksPage from "./pages/AdminFeedbacksPage.jsx";
import AdminGuildsPage from "./pages/AdminGuildsPage.jsx";
import AdminUsersPage from "./pages/AdminUsersPage.jsx";
import AdminWeaponsPage from "./pages/AdminWeaponsPage.jsx";

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
                        <Route path="/register" element={<RegisterPage/>}></Route>
                        <Route path="/login" element={<LoginPage/>}></Route>
                        <Route path="/news" element={<NewsPage/>}></Route>
                        <Route path="/guilds" element={<GuildsPage/>}></Route>
                        <Route path="/guilds/:id" element={<GuildDetailsPage/>}></Route>
                        <Route path="/myfeedbacks/:id" element={<MyFeedbacks/>}></Route>
                        <Route path="/admin" element={<AdminPage/>}></Route>
                        <Route path="/admin/feedbacks" element={<AdminFeedbacksPage/>}></Route>
                        <Route path="/admin/guilds" element={<AdminGuildsPage/>}></Route>
                        <Route path="/admin/users" element={<AdminUsersPage/>}></Route>
                        <Route path="/admin/weapons" element={<AdminWeaponsPage/>}></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );

}
export default App
