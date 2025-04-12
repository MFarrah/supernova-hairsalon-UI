import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

export const Authcontext = createContext (null);

function AuthContextProvider({children}) {
    const [Auth, setAuth] = useState({
        isAuth: false,
        user:null
    });
    const navigate = useNavigate();

const login = () => {
    setAuth({
     ..auth,
        isAuth: true,
        user: {
         email:"",
            id:"",
            role:"",
        }
    }),
        console.log("User is logged in"),
        navigate("/dashboard")

    }

const logout = () => {
    setAuth({
        ..auth,
        isAuth: false,
        user: null
    }),
        console.log("User is logged out"),
        navigate("/")
}

    const data = {
    isAuth: Auth.isAuth,
        login,
        logout,
    }
    return (
        <Authcontext.Provider value={data}>
            {children}
        </Authcontext.Provider>
    )
}

export default AuthContextProvider;