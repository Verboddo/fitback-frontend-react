import {useState} from "react";
import Dropzone from "react-dropzone";
import "./FileUpload.module.css"
import {uploadFile} from "../../services/FileUploadService";
import styles from "./FileUpload.module.css"
import {useHistory} from "react-router-dom";
import fileUpload from "../../assets/upload-logo.png"

function FileUpload() {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const history = useHistory()

    const onDrop = (files) => {
        if (files.length > 0) {
            setSelectedFiles(files);
        }
    };

    const upload = () => {
        let currentFile = selectedFiles[0];

        setProgress(0);
        setCurrentFile(currentFile);

        uploadFile(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
            setMessage("File is uploaded successfully!")
        })
            .catch(() => {
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
            });
        setSelectedFiles(undefined);
    };

    return (
        <div className={styles["file-upload-container"]}>

            <Dropzone onDrop={onDrop} multiple={false}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div className={styles["dropzone"]} {...getRootProps()}>
                            <img
                                className={styles["file-upload-logo"]}
                                src={fileUpload} alt="file upload image"/>
                            <input {...getInputProps()} />
                            {selectedFiles && selectedFiles[0].name ? (
                                <div className={styles["selected-file"]}>
                                    {selectedFiles && selectedFiles[0].name}
                                </div>
                            ) : (
                                <p className={styles["file-upload-text"]}>Drag and drop file here, or click to upload
                                    file</p>
                            )}
                        </div>
                        <aside className={styles["selected-file-wrapper"]}>
                            <button
                                className={styles["file-upload-button"]}
                                disabled={!selectedFiles}
                                onClick={() => upload()}
                            >
                                Upload
                            </button>
                        </aside>
                    </section>
                )}
            </Dropzone>

            <div>
                <div className={styles["alert-light"]} role="alert">
                    {message}
                </div>

                {progress === 100 &&
                <button
                    className={styles["userpage-button"]}
                    onClick={() => history.push("/userpage")}
                >Click here to go back to your profile!</button>
                }
            </div>

        </div>
    )
}

export default FileUpload