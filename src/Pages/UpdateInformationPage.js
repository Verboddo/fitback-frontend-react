import {useForm} from "react-hook-form";
import Button from "../Components/Button";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useContext, useState} from "react";
import {UserProfileContext} from "../context/UserProfileContext";
import jwt_decode from "jwt-decode";

function UpdateInformationPage() {
    const {register, handleSubmit} = useForm()
    const {userProfile} = useContext(UserProfileContext)

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

        const decodedToken = jwt_decode(token)

        try {
            const result = await axios.put(`http://localhost:8080/api/user-profile/${decodedToken.sub}`, {
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
            console.log(result)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <label htmlFor="update-information">
                <input
                    type="text"
                    placeholder="first name"
                    id="first-name"
                    {...register("firstName", {
                        required: true,
                        minLength: 3,
                        maxLength:25,
                    })}
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="last name"
                    id="last-name"
                    {...register("lastName", {
                            required: true,
                        minLength: 3,
                        maxLength: 25,
                        })}
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="address"
                    id="address"
                    {...register("address", {
                        required: true,
                        minLength: 5,
                        maxLength: 50,
                    })}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="zipcode"
                    id="zipcode"
                    {...register("zipcode", {
                        required: true,
                        pattern: /[0-9]{4}[a-zA-Z]{2}/,
                        minLength: 6,
                        maxLength: 6,
                    })}
                    value={zipcode}
                    onChange={e => setZipcode(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="country"
                    id="country"
                    {...register("country", {
                        required: true,
                        minLength: 3,
                        maxLength: 50,
                    })}
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="age"
                    id="age"
                    {...register("age", {
                        required: true,
                        min: 18,
                        max: 100,
                    })}
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="height"
                    id="height"
                    {...register("height", {
                        required: true,
                        min: 100,
                        max: 220,
                    })}
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="weight"
                    id="weight"
                    {...register("weight", {
                        required: true,
                        min: 40,
                        max: 190,
                    })}
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                />
                <Button
                    buttonType="submit"
                >
                    Update information
                </Button>
            </label>
        </form>
    )
}

export default UpdateInformationPage