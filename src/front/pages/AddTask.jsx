import React from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export function AddTask() {
    const {store, dispatch} = useGlobalReducer()
    const [task, setTask] = useState({
        title: "",
        description: ""
    })

    function handleChange({ target }) {
        setTask({
            ...task,
            [target.name]: target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(store.token)
        try {
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
                alert("Task added")
            }
            else {
                alert("Error")
            }
        } catch (error) {
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

                <button type="submit" className="btn btn-primary">Add Task</button>

            </form>
        </div>
    )
}