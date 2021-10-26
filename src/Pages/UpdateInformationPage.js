import {useForm} from "react-hook-form";
import Button from "../Components/Button";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {useHistory} from "react-router-dom";

function UpdateInformationPage() {
    const {register, handleSubmit} = useForm()

    const history = useHistory()

    async function onFormSubmit(data) {
        const token = localStorage.getItem("token")

        const decodedToken = jwt_decode(token)

        try {
            const result = await axios.post(`http://localhost:8081/api/users/update-information/${decodedToken.sub}`, {
                fullName: data.fullName,
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
                    placeholder="full name"
                    id="full-name"
                    {...register("fullName")}
                />
                <input
                    type="text"
                    placeholder="address"
                    id="address"
                    {...register("address")}
                />
                <input
                    type="text"
                    placeholder="zipcode"
                    id="zipcode"
                    {...register("zipcode")}
                />
                <input
                    type="text"
                    placeholder="country"
                    id="country"
                    {...register("country")}
                />
                <input
                    type="number"
                    placeholder="age"
                    id="age"
                    {...register("age")}
                />
                <input
                    type="number"
                    placeholder="height"
                    id="height"
                    {...register("height")}
                />
                <input
                    type="number"
                    placeholder="weight"
                    id="weight"
                    {...register("weight")}
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