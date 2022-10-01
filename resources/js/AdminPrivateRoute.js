import { initial } from "lodash";
import React, { useEffect } from "react";
import { BrowserRouter as Route, Navigate } from 'react-router-dom';
import Admin from "./container/Admin";

export default function AdminPrivateRoute(props) {

    const [authenticated, setAuthenticated] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {

        axios.get(`/api/checkingAuthenticated`).then(res => {
            if(res.status === 200) {
                setAuthenticated(true)
            }
            setLoading(false)
        })

        return () => {
            setAuthenticated(false)
        }
    }, [])

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (

        // <Route
        //     {...rest}
        //     render={({ props, location }) =>
        //         localStorage.getItem("auth_token") ? 
        //         (<Admin {...props} />) : 
        //         (<Redirect to={{ pathname: "/login", state: { from: location } }}/>)
        //     }
        // />
        {authenticated}?
        (<props.comp/>) : 
        (<Navigate to={"/login"}/>)

    );
}
