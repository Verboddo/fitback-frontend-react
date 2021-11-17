import {useForm} from "react-hook-form";
import Button from "../../Components/Button";
import axios from "axios";
import {useHistory} from "react-router-dom";
import styles from "./InformationPages.module.css"
import UpdateInformation from "../../Components/UpdateInformation/UpdateInformation";

function UpdateInformationPage() {
    const { register, handleSubmit, formState: {errors, isDirty, isValid} } = useForm({mode: 'onChange'})

    const history = useHistory()

    async function onFormSubmit(data) {
        const token = localStorage.getItem("token")
        try {
            await axios.post(`http://localhost:8080/api/user-profile`, {
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                zipcode: data.zipcode,
                country: data.country,
                age: data.age,
                height: data.height,
                weight: data.weight,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            history.push("/userpage")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={styles["information-page-container"]}>
            <form
                className={styles["information-form"]}
                onSubmit={handleSubmit(onFormSubmit)}>
                <label htmlFor="update-information">
                    <UpdateInformation
                        className={styles["update-information-input"]}
                        htmlFor="firstName"
                        type="text"
                        placeholder="first name"
                        id="firstName"
                        register={register}
                        registerName="firstName"
                        errors={errors}
                        required={true}
                        pattern={/^[a-zA-Z]*$/}
                        patternMessage="Name may only exist out of letters"
                        minLengthMessage="Name is to short"
                        minLength={3}
                        maxLength={25}>
                        Firstname:
                    </UpdateInformation>
                    <UpdateInformation
                        className={styles["update-information-input"]}
                        htmlFor="lastName"
                        type="text"
                        placeholder="last name"
                        id="lastName"
                        register={register}
                        registerName="lastName"
                        minLengthMessage="Name is too short"
                        errors={errors}
                        required={true}
                        pattern={/^[a-zA-Z]*$/}
                        patternMessage="Name may only exist out of letters"
                        minLength={3}
                        maxLength={25}>
                        Lastname:
                    </UpdateInformation>
                    <UpdateInformation
                        className={styles["update-information-input"]}
                        htmlFor="address"
                        type="text"
                        placeholder="address"
                        id="address"
                        register={register}
                        errors={errors}
                        required={true}
                        registerName="address"
                        minLength={5}
                        minLengthMessage="Address name is too short"
                        maxLength={50}
                        maxLengthMessage="Address name is too long">
                        Address:
                    </UpdateInformation>
                    <UpdateInformation
                        className={styles["update-information-input"]}
                        htmlFor="zipcode"
                        type="text"
                        placeholder="zipcode"
                        id="zipcode"
                        register={register}
                        errors={errors}
                        required={true}
                        registerName="zipcode"
                        minLength={6}
                        minLengthMessage="Zipcode is too short"
                        maxLength={6}
                        maxLengthMessage="Zipcode is too long"
                        pattern={/[0-9]{4}[a-zA-Z]{2}/}
                        patternMessage="Zipcode may only exist out of 4 numbers and 2 letters">
                        Zipcode:
                    </UpdateInformation>
                    <UpdateInformation
                        className={styles["update-information-input"]}
                        htmlFor="country"
                        type="text"
                        placeholder="country"
                        id="country"
                        register={register}
                        errors={errors}
                        required={true}
                        registerName="country"
                        pattern={/^[a-zA-Z]*$/}
                        patternMessage="Country name may only exist out of letters"
                        minLength={3}
                        minLengthMessage="Country name is too short"
                        maxLength={50}
                        maxLengthMessage="Country name is too long">
                        Country:
                    </UpdateInformation>
                    <UpdateInformation
                        className={styles["update-information-input"]}
                        htmlFor="age"
                        type="number"
                        placeholder="age"
                        id="age"
                        register={register}
                        errors={errors}
                        required={true}
                        registerName="age"
                        min={12}
                        minMessage="Number is too low"
                        max={100}
                        maxMessage="Number is too high"
                        pattern={/^[0-9]*$/}
                        patternMessage="Age may only exist out of numbers">
                        Age:
                    </UpdateInformation>
                    <UpdateInformation
                        className={styles["update-information-input"]}
                        htmlFor="height"
                        type="number"
                        placeholder="height"
                        id="height"
                        register={register}
                        errors={errors}
                        required={true}
                        registerName="height"
                        min={100}
                        minMessage="Number is too low"
                        max={220}
                        maxMessage="Number is too high"
                        pattern={/^[0-9]*$/}
                        patternMessage="Height may only exist out of numbers">
                        Height:
                    </UpdateInformation>
                    <UpdateInformation
                        className={styles["update-information-input"]}
                        htmlFor="weight"
                        type="number"
                        placeholder="weight"
                        id="weight"
                        register={register}
                        errors={errors}
                        required={true}
                        registerName="weight"
                        min={40}
                        minMessage="Number is too low"
                        max={190}
                        maxMessage="Number is too high"
                        pattern={/^[0-9]*$/}
                        patternMessage="Weight may only exist out of numbers">
                        Weight:
                    </UpdateInformation>
                    <Button
                        className={styles["information-page-button"]}
                        buttonType="submit"
                        disabled={!isDirty || !isValid}
                    >
                        Update information
                    </Button>
                </label>
            </form>
        </div>
    )
}

export default UpdateInformationPage