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
                    <p className={styles["table-row"]}>
                        <label className={styles["table-cell"]}>Username:</label>
                        <label className={styles["table-cell"]}>{userName}</label>
                    </p>
                    <p className={styles["table-row"]}>
                        <label className={styles["table-cell"]}>Name:</label>
                        <label className={styles["table-cell"]}>{userFirstName} {userLastName}</label>
                    </p>
                    <p className={styles["table-row"]}>
                        <label className={styles["table-cell"]}>E-mail:</label>
                        <label className={styles["table-cell"]}>{userEmail}</label>
                    </p>
                    <p className={styles["table-row"]}>
                        <label className={styles["table-cell"]}>Address</label>
                        <label className={styles["table-cell"]}>{userAddress}</label>
                    </p>
                    <p className={styles["table-row"]}>
                        <label className={styles["table-cell"]}>Zipcode:</label>
                        <label className={styles["table-cell"]}>{userZipcode}</label>

                    </p>
                    <p className={styles["table-row"]}>
                        <label className={styles["table-cell"]}>Country:</label>
                        <label className={styles["table-cell"]}>{userCountry}</label>

                    </p>
                    <p className={styles["table-row"]}>
                        <label className={styles["table-cell"]}>Age:</label>
                        <label className={styles["table-cell"]}>{userAge}</label>
                    </p>
                    <p className={styles["table-row"]}>
                        <label className={styles["table-cell"]}>Height:</label>
                        <label className={styles["table-cell"]}>{userHeight}</label>

                    </p>
                    <p className={styles["table-row"]}>
                        <label className={styles["table-cell"]}>Weight:</label>
                        <label className={styles["table-cell"]}>{userWeight}</label>
                    </p>
                </section>
            </div>
        </>
    )
}

export default UserInformation