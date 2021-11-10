import './App.css';
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/login/Login";
import PersonalTrainerPage from "./Pages/PersonalTrainerPage/PersonalTrainerPage";
import UserPage from "./Pages/UserPage/UserPage";
import UserExercisePage from "./Pages/userExercisePage/UserExercisePage";
import {Redirect, Route, Switch} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import UpdateInformationPage from "./Pages/UpdateInformationPage";
import ContactPage from "./Pages/ContactPage";
import PostInformationPage from "./Pages/PostInformationPage";
import {UserProfileContext} from "./context/UserProfileContext";

function App() {
    const { isAuth, isAdmin } = useContext(AuthContext)
    const { userProfile } = useContext(UserProfileContext)

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

                    <Route exact path="/userexercisepage">
                        {isAuth ? <UserExercisePage/> : <Redirect to="/"/>}

                    </Route>

                    <Route exact path="/personaltrainerpage">
                        {isAuth && isAdmin ? <PersonalTrainerPage/> : <Redirect to="/"/>}
                    </Route>

                    <Route exact path="/contact">
                        <ContactPage/>
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
