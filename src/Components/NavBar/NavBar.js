import {Link, useHistory} from "react-router-dom";
import Button from "../Button";
import dumbell from "../../assets/dumbell1.png"
import styles from "./NavBar.module.css"
import banner from "../../assets/foto2.jpg";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {
    const { isAuth, LoggedOut } = useContext(AuthContext)

    const history = useHistory()

    return (
        <>
            <nav>
                {/*Logo with app text that links to homepage*/}
                <Link to="/">
                <span className={styles["logo-container"]}>
                    <img src={dumbell} alt="logo"/>
                    <h3>
                        Fitback
                    </h3>
                </span>
                </Link>

                {/*Buttons that are available to the public*/}
                {!isAuth &&
                <div>
                    <Button
                        buttonType="button"
                        history={history}
                        location="/login"
                    >
                        Log in
                    </Button>
                </div>
                }

                {!isAuth &&
                <div>
                    <Button
                        buttonType="button"
                        history={history}
                        location="/signup"
                    >
                        Signup
                    </Button>
                </div>
                }

                {/*If user is logged in it links to userpage if personal trainer is logged in it links to personal trainer page*/}
                {isAuth &&
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
                }

                {/*Links to the exercise page if user or personal trainer is logged in*/}
                {isAuth &&
                <div>
                    <Button
                        buttonType="type"
                        history={history}
                        location="/userexercisepage"
                    >
                        Exercises
                    </Button>
                </div>
                }

                <div>
                    <Button
                        buttonType="button"
                        history={history}
                        location="/contact"
                    >
                        Contact
                    </Button>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={LoggedOut}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <span className={styles["banner-container"]}>
                <img src={banner} alt="banner"/>
            </span>
        </>
    )
}

export default NavBar