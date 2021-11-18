import {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {UserProfileContext} from "../../context/UserProfileContext";
import UserInformation from "../../Components/UserInformation/UserInformation";
import {AuthContext} from "../../context/AuthContext";
import styles from "./UserPage.module.css"
import axios from "axios";

function UserPage() {
    const {userProfile, loading} = useContext(UserProfileContext)
    const {user} = useContext(AuthContext)

    const [userFileData, setUserFileData] = useState([])

    const token = localStorage.getItem("token")

    useEffect(() => {
        async function fetchFileData() {
            try {
                const result = await axios("http://localhost:8080/api/file/files", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                // mapping over result to get the usernames
                const usernames = result.data.map(user => user.username)

                // looping over usernames
                for (let i = 0; i < usernames.length; i++) {
                    // if logged in use matches a username from the result
                    if (usernames[i] === user.username) {
                        // set that user from the if statement
                        const user = usernames[i]
                        // filter over data to get all the files with currently logged in username
                        const currentUser = result.data.filter(username => user.includes(username.username))
                        // set data to state
                        setUserFileData(currentUser)
                        //  break the loop if condition is true
                        break
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }
        if (token) {
            fetchFileData()
        }
    }, [])

    const history = useHistory()

    function handleClick() {
        if (userProfile.firstName === undefined) {
            history.push("/post-information")
        } else {
            history.push("/update-information")
        }
    }

    return (
        <div className={styles["userpage-container"]}>
            <div>
                {loading && <span>Loading...</span>}
                {userProfile &&
                <UserInformation
                    userName={user.username}
                    userFirstName={userProfile.firstName}
                    userLastName={userProfile.lastName}
                    userEmail={user.email}
                    userAddress={userProfile.address}
                    userZipcode={userProfile.zipcode}
                    userCountry={userProfile.country}
                    userAge={userProfile.age}
                    userHeight={userProfile.height}
                    userWeight={userProfile.weight}
                />
                }

                {!loading &&
                <button
                    className={styles["update-information-button"]}
                    type="button"
                    onClick={() => handleClick()}
                >Update information
                </button>
                }

                <p>If you would like to upload a  <Link to="/video-upload">video</Link> for the personal trainer to review.</p>
            </div>

            {userFileData.length > 0 &&
            <div className={styles["feedback-container"]}>
                <h2>Uploaded video's and feedback</h2>
                <ul>{userFileData.map(filename =>
                    <li
                        className={styles["filename-list"]}
                        key={filename.id}>Video name: {filename.name}
                        {filename.feedback[0] &&
                        <p
                            className={styles["feedback"]}
                        >
                            Feedback: {filename.feedback[0].feedback}</p>
                        }
                    </li>
                )}
                </ul>
            </div>
            }
        </div>
    )
}

export default UserPage