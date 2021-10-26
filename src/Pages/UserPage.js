import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import Button from "../Components/Button";
import {useHistory} from "react-router-dom";

function UserPage() {
    const { user } = useContext(AuthContext)

    const history = useHistory()

    return (
        <>
            <section>
                <p>Username: {user.username}</p>
                <p>Name: {user.fullName}</p>
                <p>E-mail: {user.email}</p>
                <p>Address: {user.address}</p>
                <p>Zipcode: {user.zipcode}</p>
                <p>Country: {user.country}</p>
                <p>Age: {user.age}</p>
                <p>Height: {user.height}</p>
                <p>Weight: {user.weight}</p>
            </section>
            <Button
                buttonType="button"
                history={history}
                location="/update-information"
            >
                Update information
            </Button>
        </>
    )
}

export default UserPage