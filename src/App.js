import './App.css';
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/login/Login";
import PersonalTrainerPage from "./Pages/PersonalTrainerPage/PersonalTrainerPage";
import UserPage from "./Pages/UserPage/UserPage";
import VideoUploadPage from "./Pages/videoUploadPage/VideoUploadPage";
import {Redirect, Route, Switch} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import UpdateInformationPage from "./Pages/informationPages/UpdateInformationPage";
import PostInformationPage from "./Pages/informationPages/PostInformationPage";

function App() {
    const { isAuth, isAdmin } = useContext(AuthContext)

    return (
        <>
            <NavBar/>
            <div className="page-container">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <Route exact path="/signup">
                        <SignUp/>
                    </Route>

                    <Route exact path="/login">
                        <Login/>
                    </Route>

                    <Route exact path="/userpage">
                        {isAuth ? <UserPage/> : <Redirect to="/"/>}
                    </Route>

                    <Route exact path="/video-upload">
                        {isAuth ? <VideoUploadPage/> : <Redirect to="/"/>}

                    </Route>

                    <Route exact path="/personaltrainerpage">
                        {isAuth && isAdmin ? <PersonalTrainerPage/> : <Redirect to="/"/>}
                    </Route>

                    <Route exact path="/update-information">
                        {isAuth ? <UpdateInformationPage/> : <Redirect to="/"/>}
                    </Route>

                    <Route exact path={"/post-information"}>
                        {isAuth ? <PostInformationPage/> : <Redirect to="/"/>}
                    </Route>

                </Switch>
            </div>
        </>
    );
}

export default App;
