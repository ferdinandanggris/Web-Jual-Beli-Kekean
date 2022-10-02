import { Container } from "@mui/material";
import axios from "axios";
import { initial } from "lodash";
import React, { useEffect } from "react";
import { BrowserRouter as Route, Navigate, useNavigate } from 'react-router-dom';
import Admin from "./container/Admin";

export default function AdminPrivateRoute(props) {

    const [authenticated, setAuthenticated] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const history = useNavigate()
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

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if(err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, "warning")
            history('/')
        }
        return Promise.reject(err)
    })

    if(loading) {
        return <></>
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
