import register from "../../assets/register.jpg"
import Button from "../../Components/Button";
import styles from "../SignUp/SignUp.module.css"

function Login() {
    return (
        <>
            <div className={styles["form-container"]}>
                <h1>Log in</h1>
                <span>
                    <img
                        className={styles["register-image"]}
                        src={register}
                        alt="login image"
                    />
                </span>

                <form>
                    <label htmlFor="login">
                        <input
                            type="text"
                            placeholder="username"
                        />
                        <input
                            type="password"
                            placeholder="wachtwoord"
                        />
                        <Button
                            className={styles["register-button"]}
                            buttonType="submit"
                        >
                            Log in
                        </Button>
                    </label>
                </form>
            </div>
        </>
    )
}

export default Login