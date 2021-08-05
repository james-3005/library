import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCurrentBook } from "../../../Context/CurrentBookProvider";

const PrivateRouteReviewPage = ({ component: Component, ...rest }) => {
    const { currentBook } = useCurrentBook();
    return (
        <Route
            {...rest}
            render={(props) =>
                currentBook ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};

export default PrivateRouteReviewPage;
