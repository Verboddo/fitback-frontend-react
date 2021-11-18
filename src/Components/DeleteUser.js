import axios from "axios";
import {useState} from "react";

function DeleteUser({ selectedUserId, token, className }) {

    const [message, setMessage] = useState()

    async function deleteUser() {
        const answer = window.confirm("Are you sure you want to delete this user?")
        if (answer) {
            const result = await axios.delete(`http://localhost:8080/api/users/delete/${selectedUserId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            if (result.status === 200) {
                window.location.reload(true)
            }
        }
    }

    return (
        <>
            <button
                className={className}
                type="button"
                onClick={() => deleteUser()}
            >
                Delete user
            </button>

            <p>{message}</p>
        </>
    )
}

export default DeleteUser