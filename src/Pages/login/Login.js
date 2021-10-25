import loginRegisterImage from "../../assets/login-register-image.jpg"
import Button from "../../Components/Button";
import styles from "../SignUp/SignUp.module.css"
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";

function Login() {
    const { loggedIn } =useContext(AuthContext)

    const { register, handleSubmit } = useForm();

    async function onFormSubmit(data) {
        try{
            const result = await axios.post("http://localhost:8081/api/auth/signin", {
                username: data.username,
                password: data.password,
            })
            loggedIn(result.data.accessToken)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className={styles["form-container"]}>
                <h1>Log in</h1>
                <span>
                    <img
                        className={styles["register-image"]}
                        src={loginRegisterImage}
                        alt="login"
                    />
                </span>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor="login">
                        <input
                            type="text"
                            placeholder="username"
                            id="username"
                            {...register("username")}
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
                            Log in
                        </Button>
                    </label>
                </form>
            </div>
        </>
    )
}

export default Login