
import { useNavigate } from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import RoleBasedApiHelper from "../helpers/RoleBasedApiHelper";
import {CheckTokenValidity} from "../helpers/CheckTokenValidity.jsx";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });

    const navigate = useNavigate();

    useEffect(() =>{
        const storedToken = localStorage.getItem("token");
        if (storedToken && CheckTokenValidity(storedToken)) {
            void login(storedToken);
        }else {
            void logout();
        }
    }, []);

    const login = async (jwtToken) => {
        try {
            const decodedToken = jwtDecode(jwtToken);
            localStorage.setItem("token", jwtToken);
            console.log("Decoded JWT token:", decodedToken);

            const userData = await RoleBasedApiHelper.fetchUserData(jwtToken, decodedToken);

            setAuth({
                isAuth: true,
                user: {
                    email: userData.email,
                    id: userData.id,
                    role: userData.role,
                },
                status: "done"
            });

            console.log("AuthContext: User is logged in", userData);

        } catch (error) {
            console.error("AuthContext: Login failed", error);
        }
    };


    const logout = () => {
        setAuth({
            isAuth: false,
            user: null,
            status: "done"
        });
        localStorage.removeItem("token");
        console.log("AuthContext: User is logged out");
        navigate("/LoginPage");
    };

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
