import React from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { bool } from "prop-types";

export function AddTask() {
    const { store, dispatch } = useGlobalReducer()
    const [task, setTask] = useState({
        title: "",
        description: ""
    })
    const [alert, setAlert] = useState({
        'show': false,
        'success': bool,
        'message': ""
    })

    function handleChange({ target }) {
        setTask({
            ...task,
            [target.name]: target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            if (task.title.trim() == "" || task.description.trim() == "") {
                setAlert({
                    ['show']: true,
                    ['success']: false,
                    ['message']: "Title and description are required"
                })
                return
            }
            if (task.title.split("").length > 60) {
                setAlert({
                    ['show']: true,
                    ['success']: false,
                    ['message']: "Title's max of characters is 60"
                })
                return
            }
            
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    },
                    body: JSON.stringify(task)
                }
            )

            if (response.ok) {
                setAlert({
                    ['show']: true,
                    ['success']: true,
                })
            }
            else {
                setAlert({
                    ['show']: true,
                    ['success']: false,
                    ['message']: "An error has ocurred"
                })
            }
        } catch (error) {
            setAlert({
                ['show']: true,
                ['success']: false,
                ['message']: "An error has ocurred"
            })
            return error
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <form className="w-50" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <textarea type="text" name="title" className="form-control w-100 auto-size" onChange={handleChange} />

                <label htmlFor="description">Description</label>
                <textarea name="description" className="form-control w-100 auto-size" onChange={handleChange} />

                <button type="submit" className="btn btn-primary mt-2">Add Task</button>
            
                {
                    alert.show &&
                    alert.success ?
                        <div className="alert alert-success mt-2" role="alert">
                            Task added!
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