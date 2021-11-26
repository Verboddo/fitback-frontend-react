import {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import UserInformation from "../../Components/UserInformation/UserInformation";
import PlayVideo from "../../Components/PlayVideo";
import styles from "./PersonalTrainerPage.module.css"
import Button from "../../Components/Button";
import DeleteUserButton from "../../Components/deleteUserButton/DeleteUserButton";
import DeleteFileButton from "../../Components/DeleteFileButton";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import TextAreaComponent from "../../Components/TextAreaComponent";

function PersonalTrainerPage() {

    const {register, handleSubmit, formState: {errors, isDirty, isValid}} = useForm({mode: 'onChange'})

    const [error, toggleError] = useState(false)
    const [loading, toggleLoading] = useState(false)
    const [fileLoading, toggleFileLoading] = useState(false)
    const [feedbackLoading, toggleFeedbackLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

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

    const [changeData, setChangeData] = useState(false)

    const token = localStorage.getItem("token")

    function onFormSubmit(data) {
    }

    // get user on username and file data for file download
    useEffect(() => {
        setIsMounted(true)
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
        getUserData()
        return () => { setIsMounted(false)}
    }, [selectedUser, allUserData])



    // get all users
    useEffect(() => {
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
                        }
                    })
                    setAllUserData(result.data)
                } catch (e) {
                    console.error(e)
                    toggleError(true)
                }
                toggleLoading(false)
            }
        }
        getAllUserData()
        return () => { setIsMounted(false)}
    }, [])



    useEffect(() => {
        setIsMounted(true)
        async function getFileData() {
            toggleFileLoading(true)
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
            toggleFileLoading(false)
        }
        getFileData()
        return () => { setIsMounted(false)}
    }, [])

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
        setIsMounted(true)

        if (currentFileInfo.length > 0) {
            async function getFeedbackData() {
                try {
                    const fileIdAndName = currentFileInfo.split(" ")
                    const result = await axios(`http://localhost:8080/api/file/${fileIdAndName[0]}/feedback`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setFeedbackText(result.data[0].feedback)
                    setFeedbackId(result.data[0].id)
                } catch (e) {
                    console.error("There is no feedback with the file")
                }
            }

            getFeedbackData()
        }
        return () => { setIsMounted(false)}
    }, [currentFileInfo, changeData])

    async function onFeedbackSubmit(data) {
        toggleFeedbackLoading(true)
        setChangeData(false)
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
                setChangeData(true)
                setFeedbackText("")
                setSubmitSucces("Feedback uploaded successfully!")
            }
        } catch (e) {
            console.error(e)
        }
        toggleFeedbackLoading(false)
    }

    async function onFeedbackUpdateSubmit(data) {
        toggleFeedbackLoading(true)
        setChangeData(false)
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
                setChangeData(true)
                setFeedbackText("")
                setSubmitSucces("Feedback updated successfully!")
            }
        } catch (e) {
            console.error(e)
        }
        toggleFeedbackLoading(false)
    }

    // get selected user id to delete user by id
    useEffect(() => {
        setIsMounted(true)
        if (allUserData) {
            for (let i = 0; i < allUserData.length; i++) {
                if (allUserData[i].username === selectedUser) {
                    setUserId(allUserData[i].id)
                    break
                }
            }
        }
        return () => { setIsMounted(false)}
    }, [selectedUser])

    return (
        <div className={styles["personal-trainer-page-container"]}>
            {loading && <span>Loading...</span>}
            {error && <span>Er is iets misgegaan met het ophalen van de data</span>}

            {currentUserData.currentUserData &&
            <div>
                <p>Choose a user:</p>
                <form
                    className={styles["personal-trainer-select-box-container"]}
                    onSubmit={handleSubmit(onFormSubmit)}
                >
                    <select
                        className={styles["personal-trainer-select-box"]}
                        onChange={e => setSelectedUser(e.target.value)}>
                        <option disabled>Choose a user</option>
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

                <DeleteUserButton
                    selectedUserId={userId}
                    token={token}
                    className={styles["personal-trainer-button"]}
                />
            </div>
            }

            {!fileLoading ?
                <div className={styles["personal-trainer-video-container"]}>

                    {fileInfoForDownload.length > 0 &&
                    <p className={styles["personal-trainer-video-paragraph"]}>Choose an video based on user:</p>
                    }

                    {fileInfoForDownload.length > 0 &&
                    <form
                        className={styles["personal-trainer-select-box-container"]}
                        onSubmit={handleSubmit(onFormSubmit)}>
                        <select
                            className={styles["personal-trainer-select-box"]}
                            onChange={e => setCurrentFileInfo(e.target.value)}>
                            <option disabled>Video file name: Uploaded by user:</option>
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
                    <p>Indien de video niet laadt kunt u de video downloaden door middel van het download knop
                        hieronder</p>
                    }

                    {currentFileInfo.length > 0 &&
                    <DeleteFileButton
                        className={styles["personal-trainer-delete-button"]}
                        currentFileInfo={currentFileInfo}
                        token={token}
                    />}

                    {currentFileInfo.length > 0 &&
                    <button
                        className={styles["personal-trainer-button"]}
                        onClick={() => downloadFile()}>Download</button>
                    }
                </div> : <LoadingSpinner
                    className={styles["personal-trainer-loading-spinner"]}
                />}

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
                        <TextAreaComponent
                            name="feedback"
                            cols="105"
                            rows="10"
                            placeholder="Type your feedback here"
                            register={register}
                            registerName="feedback"
                            id="feedback"
                            required="This field may not be empty"
                            minLength={50}
                            minLengthMessage="It has to be a minimum of 50 characters"
                            maxLength={1024}
                            maxLengthMessage="It can be a maximum of 1024 characters"
                            errors={errors}
                        />
                        <p>{submitSuccess}</p>
                        <div className={styles["button-container"]}>

                            {!feedbackLoading ?
                                <Button
                                    className={styles["personal-trainer-button"]}
                                    buttonType="submit"
                                    disabled={!isDirty || !isValid}
                                >
                                    Upload feedback
                                </Button> : <LoadingSpinner
                                    className={styles["feedback-loading-spinner"]}
                                />}
                        </div>
                    </label>
                </form>
            </div>
            }

            {feedbackText && currentFileInfo.length > 0 &&
            <div className={styles["feedback-container"]}>
                <form onSubmit={handleSubmit(onFeedbackUpdateSubmit)}>
                    <p>Please give your feedback:</p>
                    <label htmlFor="feedback">
                        <TextAreaComponent
                            name="feedback"
                            cols="105"
                            rows="10"
                            placeholder="Type your feedback here"
                            register={register}
                            registerName="feedback"
                            id="feedback"
                            required="This field may not be empty"
                            minLength={50}
                            minLengthMessage="It has to be a minimum of 50 characters"
                            maxLength={1024}
                            maxLengthMessage="It can be a maximum of 1024 characters"
                            errors={errors}
                        />
                        <p>{submitSuccess}</p>
                        <div className={styles["button-container"]}>

                            {!feedbackLoading ?
                                <Button
                                    className={styles["personal-trainer-button"]}
                                    buttonType="submit"
                                    disabled={!isDirty || !isValid}
                                >
                                    Update feedback
                                </Button> : <LoadingSpinner
                                    className={styles["feedback-loading-spinner"]}
                                />}
                        </div>
                    </label>
                </form>
            </div>
            }
        </div>
    )
}

export default PersonalTrainerPage