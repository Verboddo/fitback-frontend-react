import {useContext} from "react";
import Button from "../../Components/Button";
import {useHistory} from "react-router-dom";
import {UserProfileContext} from "../../context/UserProfileContext";
import UserInformation from "../../Components/UserInformation/UserInformation";
import {AuthContext} from "../../context/AuthContext";
import styles from "./UserPage.module.css"

function UserPage() {
    const {userProfile} = useContext(UserProfileContext)
    const { user } = useContext(AuthContext)

    const history = useHistory()

    return (
        <>
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

            <Button
                className={styles["update-information-button"]}
                buttonType="button"
                history={history}
                location="/update-information"
            >
                Update information
            </Button>

            <Button
                className={styles["update-information-button"]}
                buttonType="button"
                history={history}
                location="/post-information"
            >
                Update information
            </Button>

        </>
    )
}

export default UserPage