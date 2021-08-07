import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";
import { LoaderProvider } from "./Context/LoaderProvider";
import { NotificationProvider } from "./Context/NotificationProvider";
import { CurrentBookProvider } from "./Context/CurrentBookProvider";
import { FilterBookProvider } from "./Context/FilterBookProvider";
import "./Translate/i18n";

ReactDOM.render(
    <Router>
        <AuthProvider>
            <LoaderProvider>
                <NotificationProvider>
                    <CurrentBookProvider>
                        <FilterBookProvider>
                            <App />
                        </FilterBookProvider>
                    </CurrentBookProvider>
                </NotificationProvider>
            </LoaderProvider>
        </AuthProvider>
    </Router>,
    document.getElementById("root")
);
