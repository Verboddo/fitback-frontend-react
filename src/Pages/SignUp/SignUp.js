import styles from "./SignUp.module.css"
import register from "../../assets/register.jpg"
import Button from "../../Components/Button";

function SignUp() {
    return (
        <>
            <div className={styles["form-container"]}>
                <h1>Signup</h1>

                <span>
                    <img
                        className={styles["register-image"]}
                        src={register}
                        alt="register"/>
                </span>

                <form>
                    <label htmlFor="signUp">
                        <input
                            type="text"
                            placeholder="username"
                        />
                        <input
                            type="email"
                            placeholder="email"
                        />
                        <input
                            type="password"
                            placeholder="wachtwoord"
                        />
                        <input
                            type="password"
                            placeholder="wachtwoord"
                        />
                        <Button
                            className={styles["register-button"]}
                            buttonType="submit"
                        >
                            Signup
                        </Button>
                    </label>
                </form>
            </div>
        </>
    )
}

export default SignUp