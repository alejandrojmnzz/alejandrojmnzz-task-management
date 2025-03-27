import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { useEffect } from "react";

export function AllTask() {

    const { store, dispatch } = useGlobalReducer()

    const [tasks, setTasks] = useState([])
    async function getTasks() {
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`,
                {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${store.token}`
                    }
                }
            )
            let data = await response.json()
            setTasks( data )
        } catch (error) {

        }
    }

    useEffect(() => {
        getTasks()
    }, [])
    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Your Tasks</h1>

            {

                tasks.map((task) => {
                    return (
                        <div className="task-list">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}