import styles from "./UserInformation.module.css"

function UserInformation({
                             userName,
                             userFirstName,
                             userLastName,
                             userEmail,
                             userAddress,
                             userZipcode,
                             userCountry,
                             userAge,
                             userHeight,
                             userWeight
                         }) {

    return (
        <>
            <div className={styles["user-information-container"]}>
                <section className={styles["user-information"]}>
                    <p>Username: {userName}</p>
                    <p>Name: {userFirstName} {userLastName}</p>
                    <p>E-mail: {userEmail}</p>
                    <p>Address: {userAddress}</p>
                    <p>Zipcode: {userZipcode}</p>
                    <p>Country: {userCountry}</p>
                    <p>Age: {userAge}</p>
                    <p>Height: {userHeight}</p>
                    <p>Weight: {userWeight}</p>
                </section>
            </div>
        </>
    )
}

export default UserInformation