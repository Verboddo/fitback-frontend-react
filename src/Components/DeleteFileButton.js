import axios from "axios";

function DeleteFileButton({ currentFileInfo, token, className }) {

    async function deleteFile() {
        const fileIdAndName = currentFileInfo.split(" ")
        const answer = window.confirm("Are you sure you want to delete this video?")
        if (answer) {
            try {
                const result = await axios.delete(`http://localhost:8080/api/file/${fileIdAndName[0]}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                if (result.status === 200) {
                    window.location.reload(true)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    return(
        <>
            <button
                className={className}
                type="button"
                onClick={() => deleteFile()}
            >
                Delete Video
            </button>
        </>
    )
}

export default DeleteFileButton