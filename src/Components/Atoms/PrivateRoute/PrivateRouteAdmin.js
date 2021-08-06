import axios from "axios";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCurrentBook } from "../../../Context/CurrentBookProvider";

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
    const [acc, setAcc] = React.useState(false);
    const handle = async (props) => {
        try {
            let res = await axios.get(
                "https://library-mini.xyz/api/v1/auth/user-profile",
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "user"
                        )}`,
                    },
                }
            );
            console.log(true);
            if (res) return false;
            else return false;
        } catch (err) {
            console.log(false);
            return false;
        }
    };

    return (
        <Route
            {...rest}
            render={async (props) => {
                let res = await handle(props);
                if (res) return <Component {...props} />;
                else return <Redirect to="/" />;
            }}
        />
    );
};

export default PrivateRouteAdmin;
