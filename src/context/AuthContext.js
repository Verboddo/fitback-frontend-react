import {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {useHistory} from "react-router-dom";

// Creating context
export const AuthContext = createContext({})

// Create function AuthContextProvider
function AuthContextProvider({children}) {

    //Create a useState for is authenticated
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    })

    const history = useHistory()

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token) {
            const decodedToken = jwt_decode(token)

            async function getUserData() {
                try {
                    const result = await axios(`http://localhost:8081/api/users/${decodedToken.sub}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        })
                    toggleIsAuth({
                        ...isAuth,
                        isAuth: true,
                        user: {
                            id: result.data.id,
                            email: result.data.email,
                            username: result.data.username,
                            fullName: result.data.fullName,
                            address: result.data.address,
                            zipcode: result.data.zipcode,
                            country: result.data.country,
                            age: result.data.age,
                            height: result.data.height,
                            weight: result.data.weight,
                        },
                        status: "done"
                    })
                } catch (e) {
                    console.error(e)
                }
            }

            if (token) {
                getUserData()
            }
        } else {
            // zo nee, dan gaan we verder met ons leven => status: done
            toggleIsAuth({
                ...isAuth,
                isAuth: false,
                user: null,
                status: 'done'
            })
        }
    }, [])

    async function loggedIn(JWT) {
        localStorage.setItem("token", JWT)

        const decodedToken = jwt_decode(JWT)

        try {
            const result = await axios(`http://localhost:8081/api/users/${decodedToken.sub}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JWT}`
                    }
                })
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    id: result.data.id,
                    email: result.data.email,
                    username: result.data.username,
                },
                status: "done"
            })
        } catch (e) {
            console.error(e)
        }
        history.push("/userpage")
        console.log("Gebruiker is ingelogd")
    }

    function LoggedOut() {
        localStorage.clear()
        toggleIsAuth({
            ...isAuth,
            isAuth: false,
            user: null,
            status: "done"
        })
        console.log("Gebruiker is uitgelogd")
        history.push("/")
    }


    const contextData = {
        ...isAuth,
        loggedIn,
        LoggedOut,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>)
}

export default AuthContextProvider