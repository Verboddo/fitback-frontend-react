import {useContext} from "react";
import {useHistory} from "react-router-dom";
import {UserProfileContext} from "../../context/UserProfileContext";
import UserInformation from "../../Components/UserInformation/UserInformation";
import {AuthContext} from "../../context/AuthContext";
import styles from "./UserPage.module.css"

function UserPage() {
    const {userProfile, loading} = useContext(UserProfileContext)
    const {user} = useContext(AuthContext)
    const token = localStorage.getItem("token")

    const history = useHistory()

    function handleClick() {
        if (userProfile.firstName === undefined) {
            history.push("/post-information")
        } else {
            history.push("/update-information")
        }
    }

    return (
        <>
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
        </>
    )
}

export default UserPage