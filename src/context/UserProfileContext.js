import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "./AuthContext";

export const UserProfileContext = createContext({})

function UserProfileContextProvider({children}) {

    const { user } = useContext(AuthContext)

    const [userProfileData, setUserProfileData] = useState({
        userProfile: null,
    })
    const [loading, toggleLoading] = useState(false);
    const [changeData, setChangeData] = useState(false)

    useEffect(() => {
        toggleLoading(true)
        setChangeData(false)
        const token = localStorage.getItem("token")
        if (token) {
            async function getUserData() {
                try {
                    const result = await axios(`http://localhost:8080/api/users/${user.id}/userprofile`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setUserProfileData({
                        userProfile: {
                            firstName: result.data?.firstName,
                            lastName: result.data?.lastName,
                            address: result.data?.address,
                            zipcode: result.data?.zipcode,
                            country: result.data?.country,
                            age: result.data?.age,
                            height: result.data?.height,
                            weight: result.data?.weight
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
    }, [user, changeData])

    const contextData = {
        ...userProfileData,
        loading,
        setChangeData,
    }

    return (
        <UserProfileContext.Provider value={contextData}>
            {children}
        </UserProfileContext.Provider>)
}

export default UserProfileContextProvider