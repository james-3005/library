import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const url = "https://librarymini.ga/api/v1/auth/";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    function signup(email, username, password, phone = "none") {
        async function register() {
            try {
                let res = await axios.post(
                    "http://library-mini.xyz/api/v1/auth/register",
                    {
                        name: username,
                        email: email,
                        password: password,
                        password_confirmation: password,
                        phone: phone,
                        address: "none",
                        dob: "2001-02-19",
                    }
                );
                return "ok";
            } catch (err) {
                throw err;
            }
        }
        return register();
    }

    function login(email, password) {
        async function login2() {
            try {
                let res = await axios.post(
                    "http://library-mini.xyz/api/v1/auth/login",
                    {
                        email: email,
                        password: password,
                    }
                );
                return res.data.original;
            } catch (err) {
                throw err;
            }
        }
        return login2();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password, newpassword, token) {
        async function resetpass() {
            try {
                let res = await axios.post(
                    "http://library-mini.xyz/api/v1/auth/change-password",
                    {
                        old_password: password,
                        new_password: newpassword,
                        new_password_confirmation: newpassword,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                return res.data;
            } catch (err) {
                throw err;
            }
        }
        return resetpass();
    }
    useEffect(() => {
        const user = window.localStorage.getItem("user");
        axios
            .get("http://library-mini.xyz/api/v1/auth/user-profile", {
                headers: { Authorization: `Bearer ${user}` },
            })
            .then((res) => {
                setCurrentUser(user);
            })
            .catch((err) => {
                setCurrentUser("");
            });
    }, []);

    const value = {
        currentUser,
        setCurrentUser,
        login,
        signup,
        resetPassword,
        // updateEmail,
        updatePassword,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
