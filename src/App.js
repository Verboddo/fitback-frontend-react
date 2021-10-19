import './App.css';
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import PersonalTrainerPage from "./Pages/PersonalTrainerPage";
import UserPage from "./Pages/UserPage";
import UserExercisePage from "./Pages/UserExercisePage";
import {Route, Switch} from "react-router-dom";

function App() {
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
                    <UserPage/>
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
