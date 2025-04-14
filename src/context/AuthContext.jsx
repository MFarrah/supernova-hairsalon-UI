import {useNavigate} from "react-router-dom";
import {createContext, useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext (null);

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user:null
    });
    const navigate = useNavigate();

const login = async (jwtToken) => {
    console.log(jwtDecode(jwtToken));
    const decodedToken = jwtDecode(jwtToken);
    localStorage.setItem("token", jwtToken);
    try{
        const response = await axios.get(`http://localhost:8080/api/customers/${decodedToken.sub}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
        setAuth({
            ...auth,
            isAuth: true,
            user: {
                email: response.data.email,
                id: response.data.id,
                role: response.data.role,
            }
        }),
            console.log("authcontext  : User is logged in"),
            navigate("/DashboardPage")
    } catch (e) {
        console.error(e);
    }


    }

const logout = () => {
    setAuth({
        ...auth,
        isAuth: false,
        user: null
    }),
        console.log("User is logged out"),
        navigate("/")
}

    const data = {
    isAuth: auth.isAuth,
        user: auth.user,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;