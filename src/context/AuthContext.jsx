import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser({ email: decoded.sub });
                }
            } catch (error) {
                console.error("Invalid Token:", error);
                logout();
            }
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            setUser({ email });
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Failed:", error.response?.data?.message || "Unknown error");
            alert("Invalid credentials");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};
