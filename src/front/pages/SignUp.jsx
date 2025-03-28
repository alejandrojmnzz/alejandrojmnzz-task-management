import React from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    const [alert, setAlert] = useState({
        'show': false,
        'success': true,
        'message': ""
    })

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange({ target }) {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (user.name.trim() == "" || user.email.trim() == "" || user.password.trim() == "") {
            setAlert({
                ['show']: true,
                ['success']: false,
                ['message']: "All credentials are required"
            })
            return
        }
        if (user.name.split("").length > 120) {
            setAlert({
                ['show']: true,
                ['success']: false,
                ['message']: "Name's max of characters is 120"
            })
            return
        }
        if (user.email.split("").length > 120) {
            setAlert({
                ['show']: true,
                ['success']: false,
                ['message']: "Email's max of characters is 120"
            })
            return
        }
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sign-up`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })

            let data = await response.json()
            if (response.ok) {
                setAlert({
                    ['show']: true,
                    ['success']: true
                })
                setTimeout(() => {
                    navigate('/log-in')
                  }, "1000");

            }
            else {
                alert('Error')
            }
        } catch (error) {
            return error
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <form className="w-50" onSubmit={handleSubmit}>
                <label htmlFor="name" className="form-label" >Name</label>
                <input name="name" className="form-control" onChange={handleChange} value={user.name} />

                <label htmlFor="email" className="form-label" >Email</label>
                <input type="email" name="email" className="form-control" onChange={handleChange} value={user.email} />

                <label htmlFor="password" className="form-label">Password</label>
                <input name="password" className="form-control" onChange={handleChange} value={user.password} />

                <button type="submit" className="btn btn-primary" >Submit</button>

                {
                    alert.show &&
                    alert.success ?
                        <div className="alert alert-success mt-2" role="alert">
                            Registered!
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

export default SignUp