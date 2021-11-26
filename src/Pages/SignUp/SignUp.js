import styles from "./SignUp.module.css"
import loginRegisterImage from "../../assets/login-register-image.jpg"
import Button from "../../Components/Button";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router-dom";
import InputComponent from "../../Components/InputComponent";
import {useState} from "react";

function SignUp() {
    const { register, handleSubmit, formState: {errors, isDirty, isValid} } = useForm({mode: 'onChange'})

    const history = useHistory()

    const [error, setError] = useState(false)

    async function onFormSubmit(data) {
        setError(false)
        try {
            const result = await axios.post("http://localhost:8080/api/auth/signup",{
                username: data.username,
                email: data.email,
                password: data.password,
            })
                console.log(result)
                history.push("/login")
        } catch (e) {
            if (e) {
                setError(true)
            }
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

                <form
                    className={styles["signup-form"]}
                    onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor="signUp">
                        <InputComponent
                            type="text"
                            placeholder="username"
                            id="username"
                            register={register}
                            registerName="username"
                            errors={errors}
                            required="This field may not be empty"
                            minLength={3}
                            minLengthMessage="It has to be a minimum of 3 characters"
                            maxLength={20}
                            maxLengthMessage="It can be a maximum of 20 characters"
                        />
                        <InputComponent
                            type="email"
                            placeholder="email"
                            id="email"
                            register={register}
                            registerName="email"
                            errors={errors}
                            required="This field may not be empty"
                            minLength={3}
                            minLengthMessage="It has to be a minimum of 3 characters"
                            maxLength={50}
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
                            Signup
                        </Button>
                        {error && <p className="error">Username or E-mail already in use</p>}
                    </label>
                </form>
            </div>
        </>
    )
}

export default SignUp