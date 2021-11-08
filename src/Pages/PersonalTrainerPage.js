import {useEffect, useState} from "react";
import {getFiles} from "../services/FileUploadService";
import axios from "axios";
import {useForm} from "react-hook-form";
import UserInformation from "../Components/UserInformation";

function PersonalTrainerPage() {

    const {handleSubmit} = useForm()

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const [selectBoxUserChoice, setSelectBoxUserChoice] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [fileInfos, setFileInfos] = useState([])
    const [currentUserData, setCurrentUserData] = useState({
        currentUserData: null,
    })
    const [currentFileInfo, setCurrentFileInfo] = useState([])
    const [fileInfoForDownload, setFileInfoForDownload] = useState([])

    const fileInfoMapped = fileInfoForDownload.map(({id, name}) => ({id, name}))

    console.log(fileInfoForDownload)

    const token = localStorage.getItem("token")

    // get user on username and file data for file download
    useEffect(() => {
        async function getUserData() {
            toggleError(false)
            toggleLoading(true)
            if (token) {
                try {
                    const result = await axios(`http://localhost:8080/api/users/${selectedUser}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setCurrentUserData({
                        currentUserData: {
                            username: result.data.username,
                            firstName: result.data.userProfile?.firstName,
                            lastName: result.data.userProfile?.lastName,
                            email: result.data.email,
                            address: result.data.userProfile?.address,
                            zipcode: result.data.userProfile?.zipcode,
                            country: result.data.userProfile?.country,
                            age: result.data.userProfile?.age,
                            height: result.data.userProfile?.height,
                            weight: result.data.userProfile?.weight
                        }
                    })
                    const getFileInfo = result.data.fileDB
                    if (getFileInfo) {
                        getFileInfo.map(fileDB => fileDB)
                        setFileInfoForDownload(getFileInfo)
                    }
                } catch (e) {
                    console.error(e)
                    toggleError(true)
                }
                toggleLoading(false)
            }
        }
        if (selectedUser) {
            getUserData()
        }
    }, [selectedUser])


    // get all users
    useEffect(() => {
            if (token) {
                getAllUserData()
            }
    }, [])


    async function getAllUserData() {
        toggleError(false)
        toggleLoading(true)
        try {
            const result = await axios(`http://localhost:8080/api/users`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            // mapping over all users and returning only the usernames
            const allUsers = result.data.map(user => user.username)
            // set all usernames to useState
            setSelectBoxUserChoice(allUsers)
        } catch (e) {
            console.log(e)
            toggleError(true)
        }
        toggleLoading(false)
    }

    function onFormSubmit(data) {
    }

    useEffect(() => {
        getFiles().then((response) => {
            setFileInfos(response.data);
        });
    }, []);

    // get data to download file
    async function downloadFile() {
        const result = currentFileInfo.split(" ")
        await axios(`http://localhost:8080/api/file/${result[0]}`, {
            responseType: 'arraybuffer',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                // value moet naam van file worden
                link.setAttribute('download', `${result[1]}`);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            {loading && <span>Loading...</span>}
            {error && <span>Er is iets misgegaan met het ophalen van de data</span>}
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <select
                    onChange={e => setSelectedUser(e.target.value)}>
                    {selectBoxUserChoice.map(user => {
                        return <option
                            key={user}
                            value={user}
                        >
                            {user}
                        </option>
                    })}
                    ></select>
            </form>

            {fileInfoForDownload.length > 0 &&
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <select
                    onChange={e => setCurrentFileInfo(e.target.value)}>
                    {fileInfoMapped.map(fileId => {
                        return <option
                            key={fileId.id}
                            value={fileId.id.name}
                        >
                            {fileId.id} {fileId.name}
                        </option>
                    })}
                    ></select>
            </form>
            }

            {currentUserData.currentUserData &&
            <UserInformation
                userName={currentUserData.currentUserData.username}
                userFirstName={currentUserData.currentUserData.firstName}
                userLastName={currentUserData.currentUserData.lastName}
                userEmail={currentUserData.currentUserData.email}
                userAddress={currentUserData.currentUserData.address}
                userZipcode={currentUserData.currentUserData.zipcode}
                userCountry={currentUserData.currentUserData.country}
                userAge={currentUserData.currentUserData.age}
                userHeight={currentUserData.currentUserData.height}
                userWeight={currentUserData.currentUserData.weight}
            />
            }

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

            <button onClick={() => downloadFile()}>Download</button>

        </>
    )
}

export default PersonalTrainerPage