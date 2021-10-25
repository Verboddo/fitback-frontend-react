import styles from "./SignUp.module.css"
import loginRegisterImage from "../../assets/login-register-image.jpg"
import Button from "../../Components/Button";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router-dom";

function SignUp() {
    const { register, handleSubmit } = useForm()

    const history = useHistory()

    async function onFormSubmit(data) {
        try {
            await axios.post("http://localhost:8081/api/auth/signup",{
                username: data.username,
                email: data.email,
                password: data.password,
            })
                history.push("/login")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className={styles["form-container"]}>
                <h1>Signup</h1>

                <span>
                    <img
                        className={styles["register-image"]}
                        src={loginRegisterImage}
                        alt="register"/>
                </span>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor="signUp">
                        <input
                            type="text"
                            placeholder="username"
                            id="username"
                            {...register("username")}
                        />
                        <input
                            type="email"
                            placeholder="email"
                            id="email"
                            {...register("email")}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            id="password"
                            {...register("password")}
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