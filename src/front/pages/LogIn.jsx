import React from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

function LogIn() {
    const {store, dispatch} = useGlobalReducer()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange({target}) {
        setUser({
            ...user,
            [target.name]: target.value
        })
        console.log(user)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        try {
        let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/log-in`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })


        if (response.ok) {
            alert('Logged')
            navigate('/')
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
                <label htmlFor="email" className="form-label bg-secondary" >Email</label>
                <input name="email" className="form-control" onChange={handleChange} value={user.email}/>

                <label htmlFor="password" className="form-label bg-secondary">Password</label>
                <input name="password" className="form-control" onChange={handleChange} value={user.password} />

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default LogIn