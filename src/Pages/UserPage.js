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
                <p>Name:</p>
                <p>E-mail: {user.email}</p>
                <p>Address:</p>
                <p>Zipcode:</p>
                <p>Country:</p>
                <p>Age:</p>
                <p>Height:</p>
                <p>Weight:</p>
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