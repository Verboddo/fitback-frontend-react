import {useState} from "react";
import Dropzone from "react-dropzone";
import "./FileUpload.module.css"
import {uploadFile} from "../../services/FileUploadService";
import styles from "./FileUpload.module.css"
import {useHistory} from "react-router-dom";

function FileUpload() {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const { history } = useHistory()


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
        })
            .catch(() => {
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
            });
        setSelectedFiles(undefined);
    };


    return (
        <div>
            {currentFile && (
                <div className={styles["progress mb-3"]}>
                    <div
                    >
                        {progress}%
                    </div>
                </div>
            )}

            <Dropzone onDrop={onDrop} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div className={styles["dropzone"]} {...getRootProps()}>
                            <input {...getInputProps()} />
                            {selectedFiles && selectedFiles[0].name ? (
                                <div className={styles["selected-file"]}>
                                    {selectedFiles && selectedFiles[0].name}
                                </div>
                            ) : (
                                "Drag and drop file here, or click to select file"
                            )}
                        </div>
                        <aside className={styles["selected-file-wrapper"]}>
                            <button
                                className={styles["btn btn-success"]}
                                disabled={!selectedFiles}
                                onClick={ () => upload()}
                            >
                                Upload
                            </button>
                        </aside>
                    </section>
                )}
            </Dropzone>

            <div className={styles["alert alert-light"]} role="alert">
                {message}
            </div>


        </div>
    )
}

export default FileUpload