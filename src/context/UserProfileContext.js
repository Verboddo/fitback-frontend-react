import {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const UserProfileContext = createContext({})

function UserProfileContextProvider({children}) {

    const [userProfileData, setUserProfileData] = useState({
        userProfile: null,
    })
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        toggleLoading(true)
        const token = localStorage.getItem("token")

        if (token) {
            const decodedToken = jwt_decode(token)

            async function getUserData() {
                try {
                    const result = await axios(`http://localhost:8080/api/users/${decodedToken.sub}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setUserProfileData({
                        userProfile: {
                            firstName: result.data.userProfile?.firstName,
                            lastName: result.data.userProfile?.lastName,
                            address: result.data.userProfile?.address,
                            zipcode: result.data.userProfile?.zipcode,
                            country: result.data.userProfile?.country,
                            age: result.data.userProfile?.age,
                            height: result.data.userProfile?.height,
                            weight: result.data.userProfile?.weight
                        }
                    })
                } catch (e) {
                    setUserProfileData({
                        userProfileData: null,
                    })
                }
                toggleLoading(false)
            }
            if(token) {
                getUserData()
            }
        }
    }, [])

    const contextData = {
        ...userProfileData,
        loading,
    }

    return (
        <UserProfileContext.Provider value={contextData}>
            {children}
        </UserProfileContext.Provider>)
}

export default UserProfileContextProvider