import {useForm} from "react-hook-form";
import Button from "../../Components/Button";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useContext, useState} from "react";
import {UserProfileContext} from "../../context/UserProfileContext";
import styles from "./InformationPages.module.css"
import UpdateInformation from "../../Components/UpdateInformation/UpdateInformation";

function UpdateInformationPage() {
    const { register, handleSubmit, formState: {errors, isDirty, isValid} } = useForm({mode: 'onChange'})
    const { userProfile, setChangeData } = useContext(UserProfileContext)

    const [firstName, setFirstName] = useState(userProfile.firstName)
    const [lastName, setLastName] = useState(userProfile.lastName)
    const [address, setAddress] = useState(userProfile.address)
    const [zipcode, setZipcode] = useState(userProfile.zipcode)
    const [country, setCountry] = useState(userProfile.country)
    const [age, setAge] = useState(userProfile.age)
    const [height, setHeight] = useState(userProfile.height)
    const [weight, setWeight] = useState(userProfile.weight)

    const history = useHistory()

    async function onFormSubmit(data) {
        const token = localStorage.getItem("token")

        try {
            await axios.put(`http://localhost:8080/api/user-profile/${userProfile.id}`, {
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
        setChangeData(true)
    }

    return (
        <>
            {userProfile &&
            <div className={styles["information-page-container"]}>
                <form
                    className={styles["information-form"]}
                    onSubmit={handleSubmit(onFormSubmit)}>
                    <UpdateInformation
                        className={styles["update-information-input"]}
                        htmlFor="firstName"
                        type="text"
                        placeholder="first name"
                        id="firstName"
                        register={register}
                        registerName="firstName"
                        errors={errors}
                        required="This field cannot be empty"
                        pattern={/^[a-zA-Z]*$/}
                        patternMessage="Name may only exist out of letters"
                        minLengthMessage="Name is to short"
                        minLength={3}
                        maxLength={25}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}>
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
                        required="This field cannot be empty"
                        pattern={/^[a-zA-Z]*$/}
                        patternMessage="Name may only exist out of letters"
                        minLength={3}
                        maxLength={25}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}>
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
                        required="This field cannot be empty"
                        registerName="address"
                        minLength={5}
                        minLengthMessage="Address name is too short"
                        maxLength={50}
                        maxLengthMessage="Address name is too long"
                        value={address}
                        onChange={e => setAddress(e.target.value)}>
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
                        required="This field cannot be empty"
                        registerName="zipcode"
                        minLength={6}
                        minLengthMessage="Zipcode is too short"
                        maxLength={6}
                        maxLengthMessage="Zipcode is too long"
                        pattern= {/[0-9]{4}[a-zA-Z]{2}/}
                        patternMessage="Zipcode may only exist out of 4 letters and 2 numbers"
                        value={zipcode}
                        onChange={e => setZipcode(e.target.value)}>
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
                        required="This field cannot be empty"
                        registerName="country"
                        pattern={/^[a-zA-Z]*$/}
                        patternMessage="Country name may only exist out of letters"
                        minLength={3}
                        minLengthMessage="Country name is too short"
                        maxLength={50}
                        maxLengthMessage="Country name is too long"
                        value={country}
                        onChange={e => setCountry(e.target.value)}>
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
                        required="This field cannot be empty"
                        registerName="age"
                        min={12}
                        minMessage="Number is too low"
                        max={100}
                        maxMessage="Number is too high"
                        pattern={/^[0-9]*$/}
                        patternMessage="Age may only exist out of numbers"
                        value={age}
                        onChange={e => setAge(e.target.value)}>
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
                        required="This field cannot be empty"
                        registerName="height"
                        min={100}
                        minMessage="Number is too low"
                        max={220}
                        maxMessage="Number is too high"
                        pattern={/^[0-9]*$/}
                        patternMessage="Height may only exist out of numbers"
                        value={height}
                        onChange={e => setHeight(e.target.value)}>
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
                        required="This field cannot be empty"
                        registerName="weight"
                        min={40}
                        minMessage="Number is too low"
                        max={190}
                        maxMessage="Number is too high"
                        pattern={/^[0-9]*$/}
                        patternMessage="Weight may only exist out of numbers"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}>
                        Weight:
                    </UpdateInformation>
                    <Button
                        className={styles["information-page-button"]}
                        buttonType="submit"
                        disabled={!isDirty || !isValid}
                    >
                        Update information
                    </Button>
                </form>
            </div>
            }
        </>
    )
}

export default UpdateInformationPage