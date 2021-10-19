import {Link, useHistory} from "react-router-dom";
import Button from "./Button";

function NavBar() {

    const history = useHistory()

    return (
        <>
            {/*Logo with app text that links to homepage*/}
            <Link to="/">
                <span className="logo-container">
                    <img src="" alt=""/>
                    <h3>
                        Fit-Back
                    </h3>
                </span>
            </Link>

            {/*Buttons that are available to the public*/}
            <div>
                <Button
                    buttonType="button"
                    history={history}
                    location="/login"
                >
                    Login
                </Button>
            </div>

            <div>
                <Button
                    buttonType="button"
                    history={history}
                    location="/signup"
                >
                    Signup
                </Button>
            </div>

            <div>
                <Button
                    buttonType="button"
                    history={history}
                    location="/contact"
                >
                    Contact
                </Button>
            </div>

            {/*If user is logged in it links to userpage if personal trainer is logged in it links to personal trainer page*/}
            <div>
                <Button
                    buttonType="type"
                    history={history}
                    location="/userpage"
                >
                    Profile
                </Button>

                <Button
                    buttonType="type"
                    history={history}
                    location="/personaltrainerpage"
                    >
                    Profile
                </Button>
            </div>

            {/*Links to the exercise page if user or personal trainer is logged in*/}
            <div>
                <Button
                    buttonType="type"
                    history={history}
                    location="/userexercisepage"
                >
                    Profile
                </Button>
            </div>

        </>
    )
}

export default NavBar