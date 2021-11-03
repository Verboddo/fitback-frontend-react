import FileUpload from "../../Components/fileUpload/FileUpload";

function UserExercisePage() {
    return (
        <>
            <div className="container" >
                <div className="my-3">
                    <h3>File upload page</h3>
                    <h4>React Hooks Drag & Drop File Upload</h4>
                </div>

                <FileUpload />
            </div>
        </>
    )
}

export default UserExercisePage