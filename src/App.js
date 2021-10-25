import './App.css';
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/login/Login";
import PersonalTrainerPage from "./Pages/PersonalTrainerPage";
import UserPage from "./Pages/UserPage";
import UserExercisePage from "./Pages/UserExercisePage";
import {Redirect, Route, Switch} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";

function App() {
    const { isAuth } = useContext(AuthContext)
    return (
        <>
            <NavBar/>
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
                    <UserExercisePage/>
                </Route>

                <Route exact path="/personaltrainerpage">
                    <PersonalTrainerPage/>
                </Route>

                <Route exact path="/contact">
                    <UserPage/>
                </Route>
            </Switch>
        </>
    );
}

export default App;
