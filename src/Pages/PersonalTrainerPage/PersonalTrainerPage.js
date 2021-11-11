import {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import UserInformation from "../../Components/UserInformation/UserInformation";
import PlayVideo from "../../Components/PlayVideo";
import styles from "./PersonalTrainerPage.module.css"

function PersonalTrainerPage() {

    const {handleSubmit} = useForm()

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const [selectBoxUserChoice, setSelectBoxUserChoice] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [currentUserData, setCurrentUserData] = useState({
        currentUserData: null,
    })
    const [currentFileInfo, setCurrentFileInfo] = useState([])
    const [fileInfoForDownload, setFileInfoForDownload] = useState([])

    const fileInfoMapped = fileInfoForDownload.map(({id, name}) => ({id, name}))

    const token = localStorage.getItem("token")

    function onFormSubmit(data) {
    }

    // get user on username and file data for file download
    useEffect(() => {
        getUserData()
    }, [selectedUser])

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

    // get all users
    useEffect(() => {
        getAllUserData()
    }, [])

    async function getAllUserData() {
        toggleError(false)
        toggleLoading(true)
        if (token) {
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
    }

    // get data to download file
    async function downloadFile() {
        const fileIdAndName = currentFileInfo.split(" ")
        await axios(`http://localhost:8080/api/file/${fileIdAndName[0]}`, {
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
                link.setAttribute('download', `${fileIdAndName[1]}`);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            {loading && <span>Loading...</span>}
            {error && <span>Er is iets misgegaan met het ophalen van de data</span>}

            {currentUserData.currentUserData &&
            <form
                className={styles["personal-trainer-select-box-container"]}
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <select
                    className={styles["personal-trainer-select-box"]}
                    onChange={e => setSelectedUser(e.target.value)}>
                    <option selected disabled>Kies een gebruiker</option>
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

            {fileInfoForDownload.length > 0 &&
            <form
                className={styles["personal-trainer-select-box-container"]}
                onSubmit={handleSubmit(onFormSubmit)}>
                <select
                    className={styles["personal-trainer-select-box"]}
                    onChange={e => setCurrentFileInfo(e.target.value)}>
                    <option selected disabled>Kies een video</option>
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

            {currentFileInfo.length > 0 &&
            <PlayVideo
                key={currentFileInfo.split(" ")[0]}
                fileId={currentFileInfo.split(" ")[0]}
                />
            }

            {currentFileInfo.length > 0 &&
            <p>Indien de video niet laadt kunt u de video downloaden door middel van het download knop hieronder</p>
            }
            {currentFileInfo.length > 0 &&
            <button
                className={styles["personal-trainer-button"]}
                onClick={() => downloadFile()}>Download</button>
            }
        </>
    )
}

export default PersonalTrainerPage