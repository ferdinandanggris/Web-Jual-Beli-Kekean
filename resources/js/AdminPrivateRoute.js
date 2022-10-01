import { initial } from "lodash";
import React, { useEffect } from "react";
import { BrowserRouter as Route, Navigate } from 'react-router-dom';
import Admin from "./container/Admin";

export default function AdminPrivateRoute(props) {

    const [authenticated, setAuthenticated] = React.useState(false)
    React.useEffect(() => {

        axios.get(`/api/checkingAuthenticated`).then(res => {
            if(res.status === 200) {
                setAuthenticated(true)
            }
        })

        return () => {
            setAuthenticated(false)
        }
    }, [])

    return (

        // <Route
        //     {...rest}
        //     render={({ props, location }) =>
        //         localStorage.getItem("auth_token") ? 
        //         (<Admin {...props} />) : 
        //         (<Redirect to={{ pathname: "/login", state: { from: location } }}/>)
        //     }
        // />
        localStorage.getItem('auth_token')?
        (<props.comp/>) : 
        (<Navigate to={"/login"}/>)

    );
}
