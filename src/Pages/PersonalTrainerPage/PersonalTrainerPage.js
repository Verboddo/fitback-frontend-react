import {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import UserInformation from "../../Components/UserInformation/UserInformation";
import PlayVideo from "../../Components/PlayVideo";
import styles from "./PersonalTrainerPage.module.css"
import Button from "../../Components/Button";
import DeleteUser from "../../Components/DeleteUser";

function PersonalTrainerPage() {

    const {handleSubmit, register} = useForm()

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    // put all users in select box so personal trainer can choose user
    const [selectBoxUserChoice, setSelectBoxUserChoice] = useState({})
    // put the selected username in useState so we can load user information
    const [selectedUser, setSelectedUser] = useState([])
    // put user information in state so we can load in page
    const [currentUserData, setCurrentUserData] = useState({
        currentUserData: null,
    })
    // all the file info inside useState to use to download file
    const [fileInfoForDownload, setFileInfoForDownload] = useState([])

    // mapping over the file info to get the right data to make the personal trainer select video data
    const fileInfoMapped = fileInfoForDownload.map(({id, name, username}) => ({id, name, username}))

    // chosen file by personal trainer to display video or download video
    const [currentFileInfo, setCurrentFileInfo] = useState([])

    const [allUserData, setAllUserData] = useState()
    const [userId, setUserId] = useState()

    const [feedbackId, setFeedbackId] = useState("")

    const [feedbackText, setFeedbackText] = useState("")
    const [submitSuccess, setSubmitSucces] = useState("")

    const token = localStorage.getItem("token")

    function onFormSubmit(data) {
    }

    // get user on username and file data for file download
    useEffect(() => {
        getUserData()
    }, [selectedUser, allUserData])

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
                setSelectBoxUserChoice({
                    user: {
                        username: allUsers,
                    }})
                setAllUserData(result.data)
            } catch (e) {
                console.log(e)
                toggleError(true)
            }
            toggleLoading(false)
        }
    }

    useEffect(() => {
        getFileData()
    }, [])

    async function getFileData() {
        try {
            const result = await axios("http://localhost:8080/api/file/files", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            setFileInfoForDownload(result.data)
        } catch (e) {
            console.error(e)
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

    useEffect(() => {
        setFeedbackText("")
        setSubmitSucces("")

        async function getFeedbackData() {
            try {
                const fileIdAndName = currentFileInfo.split(" ")
                const result = await axios(`http://localhost:8080/api/file/${fileIdAndName[0]}/feedback`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                if (fileIdAndName) {
                    setFeedbackText(result.data[0].feedback)
                }
                if (currentFileInfo) {
                    setFeedbackId(result.data[0].id)
                }
            } catch (e) {
                console.error(e)
            }
        }

        getFeedbackData()
    }, [currentFileInfo])

    async function onFeedbackSubmit(data) {
        const fileIdAndName = currentFileInfo.split(" ")
        try {
            const result = await axios.post("http://localhost:8080/api/feedback", {
                feedback: data.feedback,
                fileDB: {id: fileIdAndName[0]}
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            if (result.status === 201) {
                setFeedbackText("")
                setSubmitSucces("Feedback uploaded successfully!")
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function onFeedbackUpdateSubmit(data) {
        try {
            const result = await axios.put(`http://localhost:8080/api/feedback/${feedbackId}`, {
                    feedback: data.feedback
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
            if (result.status === 200) {
                console.log("gelukt")
                setFeedbackText("")
                setSubmitSucces("Feedback updated successfully!")
            }
            console.log(result.status)
        } catch (e) {
            console.error(e)
        }
    }

    // get selected user id to delete user by id
    useEffect(() => {
        if (allUserData) {
            for (let i = 0; i < allUserData.length; i++) {
                console.log(allUserData[i].username)
                if (allUserData[i].username === selectedUser) {
                    setUserId(allUserData[i].id)
                    break
                }
            }
        }
    }, [selectedUser])

    return (
        <div className={styles["personal-trainer-page-container"]}>
            {loading && <span>Loading...</span>}
            {error && <span>Er is iets misgegaan met het ophalen van de data</span>}

            <div>
                {currentUserData.currentUserData &&
                <form
                    className={styles["personal-trainer-select-box-container"]}
                    onSubmit={handleSubmit(onFormSubmit)}
                >
                    <select
                        className={styles["personal-trainer-select-box"]}
                        onChange={e => setSelectedUser(e.target.value)}>
                        <option selected disabled>Kies een gebruiker</option>
                        {selectBoxUserChoice.user?.username.map(user => {
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

                <DeleteUser
                    selectedUserId={userId}
                    token={token}
                    className={styles["personal-trainer-button"]}
                />
            </div>

            <div className={styles["personal-trainer-video-container"]}>
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
                                {fileId.id} {fileId.name} {fileId.username}
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
            </div>

            {feedbackText && currentFileInfo.length > 0 &&
            <section className={styles["feedback-text"]}>
                <h2>Given feedback on video:</h2>
                <p>{feedbackText}</p>
            </section>
            }

            {!feedbackText && currentFileInfo.length > 0 &&
            <div className={styles["feedback-container"]}>
                <form onSubmit={handleSubmit(onFeedbackSubmit)}>
                    <p>Please give your feedback:</p>
                    <label htmlFor="feedback">
                        <textarea
                            name="feedback"
                            id=""
                            cols="105"
                            rows="13"
                            placeholder="Type your feedback here"
                            {...register("feedback", {
                                    minLength: 10,
                                    maxLength: 1024,
                                }
                            )}
                        />
                        <p>{submitSuccess}</p>
                        <Button
                            buttonType="submit"
                        >
                            Upload feedback
                        </Button>
                    </label>
                </form>
            </div>
            }

            {feedbackText && currentFileInfo.length > 0 &&
            <div className={styles["feedback-container"]}>
                <form onSubmit={handleSubmit(onFeedbackUpdateSubmit)}>
                    <p>Please give your feedback:</p>
                    <label htmlFor="feedback">
                        <textarea
                            name="feedback"
                            id=""
                            cols="105"
                            rows="13"
                            placeholder="Type your feedback here"
                            onChange={event => setFeedbackText(event.target.value)}
                            {...register("feedback", {
                                minLength: 10,
                                maxLength: 300,
                            })}
                            defaultValue={feedbackText}
                        />
                        <p>{submitSuccess}</p>
                        <Button
                            className={styles["personal-trainer-button"]}
                            buttonType="submit"
                        >
                            Update feedback
                        </Button>
                    </label>
                </form>
            </div>
            }
        </div>
    )
}

export default PersonalTrainerPage