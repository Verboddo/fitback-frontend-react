import styles from "./SignUp.module.css"
import register from "../../assets/register.jpg"
import Button from "../../Components/Button";

function SignUp() {
    return (
        <>
            <div className={styles["register-container"]}>
                <h1>Registreren</h1>

                <span>
               <img src={register} alt="register"/>
            </span>
            </div>

            <div className={styles["form-container"]}>
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
                            Registreren
                        </Button>
                    </label>
                </form>
            </div>
        </>
    )
}

export default SignUp