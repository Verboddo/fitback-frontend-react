import axios from "axios";

function DeleteUserButton({selectedUserId, token, className}) {

    async function deleteUser() {
        try {
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
        } catch (e) {
            console.error(e)
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
        </>
    )
}

export default DeleteUserButton