import loginRegisterImage from "../../assets/login-register-image.jpg"
import Button from "../../Components/Button";
import styles from "../SignUp/SignUp.module.css"
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";
import InputComponent from "../../Components/InputComponent";
import { FaUser } from "react-icons/fa"

function Login() {
    const { loggedIn } =useContext(AuthContext)

    const { register, handleSubmit, formState: {errors, isDirty, isValid} } = useForm({mode: 'onChange'})

    const [error, setError] = useState(false)

    async function onFormSubmit(data) {
        setError(false)
        try{
            const result = await axios.post("http://localhost:8080/api/auth/signin", {
                username: data.username,
                password: data.password,
            })
            loggedIn(result.data.accessToken)
        } catch (e) {
            setError(true)
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

                <form
                    className={styles["signup-form"]}
                    onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor="login">
                        <InputComponent
                        type="text"
                        placeholder="{<FaUser/>}username"
                        id="username"
                        register={register}
                        registerName="username"
                        errors={errors}
                        required="This field may not be empty"
                        minLength={3}
                        minLengthMessage="It has to be a minimum of 3 characters"
                        maxLength={20}
                        maxLengthMessage="It can me a maximum of 20 characters"
                        />
                        <InputComponent
                            type="password"
                            placeholder="password"
                            id="password"
                            register={register}
                            registerName="password"
                            errors={errors}
                            required="This field may not be empty"
                            minLength={3}
                            minLengthMessage="It has to be a minimum of 3 characters"
                            maxLength={20}
                            maxLengthMessage="It can me a maximum of 20 characters"
                        />
                        <Button
                            className={styles["register-button"]}
                            buttonType="submit"
                            disabled={!isDirty || !isValid}
                        >
                            Log in
                        </Button>
                        {error && <p className="error">Username and password don't match</p>}
                    </label>
                </form>
            </div>
        </>
    )
}

export default Login