import {createContext, useContext, useEffect, useState} from "react";
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

    const [isAdmin, setIsAdmin] = useState(false)

    const history = useHistory()

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token) {
            const decodedToken = jwt_decode(token)

            async function getUserData() {
                try {
                    const result = await axios(`http://localhost:8080/api/users/${decodedToken.sub}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        })
                    // get user role
                    const userRole = (result.data.roles[0].name)
                    // if user had role admin setIsAdmin to true
                    if (userRole === "ROLE_ADMIN") {
                        setIsAdmin(true)
                    }
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
            const result = await axios(`http://localhost:8080/api/users/${decodedToken.sub}`,
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
            if (result.data.roles[0].name === "ROLE_ADMIN") {
                setIsAdmin(true)
            }
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
        setIsAdmin(false)
        console.log("Gebruiker is uitgelogd")
        history.push("/")
    }


    const contextData = {
        ...isAuth,
        loggedIn,
        LoggedOut,
        isAdmin,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>)
}

export default AuthContextProvider