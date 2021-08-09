import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { api } from "../env";
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
                let res = await axios.post(`${api}auth/register`, {
                    name: username,
                    email: email,
                    password: password,
                    password_confirmation: password,
                    phone: phone,
                    address: "none",
                    dob: "2001-02-19",
                });
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
                let res = await axios.post(`${api}auth/login`, {
                    email: email,
                    password: password,
                });
                return res.data.original;
            } catch (err) {
                throw err.response.data;
            }
        }
        return login2();
    }

    function updatePassword(password, newpassword, token) {
        async function resetpass() {
            try {
                let res = await axios.post(
                    `${api}auth/change-password`,
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
            .get(`${api}auth/user-profile`, {
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
        updatePassword,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
