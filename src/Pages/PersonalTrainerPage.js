import {useEffect, useState} from "react";
import {getFiles} from "../services/FileUploadService";

function PersonalTrainerPage() {

    const [fileInfos, setFileInfos] = useState([])

    useEffect(() => {
        getFiles().then((response) => {
            setFileInfos(response.data);
        });
    }, []);

    return (
        <>
            <div>Welkom op de personal trainer pagina</div>
            {fileInfos.length > 0 && (
                <div className="card">
                    <div className="card-header">List of Files</div>
                    <ul className="list-group list-group-flush">
                        {fileInfos.map((file, index) => (
                            <li className="list-group-item" key={index}>
                                <a href={file.url}>{file.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default PersonalTrainerPage