import "./App.css";
import { Route, Switch } from "react-router-dom";
import MainPage from "./Components/Page/MainPage/MainPage";
import Main from "./Components/Page/AdminPage/Main";
import UserAdminPage from "./Components/Page/AdminPage/UserAdminPage";
import LoginPage from "./Components/Page/LoginPage/LoginPage";
import HistoryPage from "./Components/Page/HistoryPage/HistoryPage";
import NavBar from "./Components/MoreClues/NavBar/NavBar";
import ReviewPage from "./Components/Page/ReviewPage/BookDetailsScreen";
import { useLoader } from "./Context/LoaderProvider";
import LoaderScreen from "./Components/MoreClues/LoaderScreen/LoaderScreen";
import { useAuth } from "./Context/AuthProvider";
import UserPage from "./Components/Page/UserPage/UserPage";
import { useNoti } from "./Context/NotificationProvider";
import PrivateRoute from "./Components/Atoms/PrivateRoute/PrivateRouteReviewPage";
import RegisterPage from "./Components/Page/RegisterPage/RegisterPage";
import AddMemberPage from "./Components/Page/AddMemberPage/RegisterPage";
import { useState } from "react";
function App() {
    const { isLoading } = useLoader();
    const { currentUser } = useAuth();
    const { noti } = useNoti();
    const [isAdmin, setIsAdmin] = useState(false);
    return (
        <div className="container">
            <NavBar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            {isLoading ? <LoaderScreen /> : <div />}
            <>{noti}</>
            <Switch>
                <Route path="/" exact component={MainPage} />

                <Route path="/loginPage">
                    <LoginPage setIsAdmin={setIsAdmin} />
                </Route>
                <Route path="/userPage" component={UserPage} />
                <Route path="/registerPage" component={RegisterPage} />
                <Route path="/addMemberPage" component={AddMemberPage} />
                <Route path="/AdminPage/user" component={UserAdminPage} />
                <Route path="/adminPage/book" component={Main} />
                <Route path="/HistoryPage" component={HistoryPage} />
                <PrivateRoute path="/reviewPage" component={ReviewPage} />
            </Switch>
        </div>
    );
}

export default App;
