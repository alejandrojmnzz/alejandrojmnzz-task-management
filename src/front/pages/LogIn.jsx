import React from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

function LogIn() {
    const {store, dispatch} = useGlobalReducer()
    const navigate = useNavigate()
    const [alert, setAlert] = useState({
        'show': false,
        'success': true,
        'message': ""
    })

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    function handleChange({target}) {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (user.email.trim() == "" || user.password.trim() == "") {
            setAlert({
                ['show']: true,
                ['success']: false,
                ['message']: "All credentials are required"
            })
            return
        }



        try {
        let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/log-in`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })

        let data = await response.json()

        if (response.ok) {
            dispatch({type: "add_token", payload: data["token"]})

            setAlert({
                ['show']: true,
                ['success']: true
            })
            setTimeout(() => {
                navigate('/')
              }, "1000");

            
        } 
        if (response.status == 404) {

            setAlert({
                ['show']: true,
                ['success']: false,
                ['message']: "Incorrect credentials"
            })
            return
            
        }
        } catch (error) {
            return error
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <form className="w-50" onSubmit={handleSubmit}>
                <label htmlFor="email" className="form-label bg-secondary" >Email</label>
                <input  type="email" name="email" className="form-control" onChange={handleChange} value={user.email}/>

                <label htmlFor="password" className="form-label bg-secondary">Password</label>
                <input name="password" className="form-control" onChange={handleChange} value={user.password} />

                <button type="submit" className="btn btn-primary mt-2" >Submit</button>
                
                {
                    alert.show &&
                    alert.success ?
                        <div className="alert alert-success mt-2" role="alert">
                            Logged!
                        </div>
                        :
                    alert.show &&
                        <div className="alert alert-danger mt-2" role="alert">
                            {alert.message}
                        </div>
                }
            </form>
        </div>
    )
}

export default LogIn