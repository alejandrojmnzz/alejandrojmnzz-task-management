import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Task() {
    const { id } = useParams()
    const { store, dispatch } = useGlobalReducer()
    const [task, setTask] = useState()

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
            dispatch({ type: 'get_tasks', payload: data })


        } catch (error) {

        }
    }

    function getTask() {
        if (store.tasks.length != 0) {

            let task = store.tasks.filter((task) => task.id == id)

            setTask(task[0])
        }
    }
    async function updateTaskStatus(id) {
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks-status/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bearer ${store.token}`
                    }
                }
            )
            getTasks()
        } catch (error) {

        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        getTask()
    }, [store.tasks])
    return (
        <div className="contanier">
            <div className="d-flex justify-content-center">
                {
                    task &&
                    <div>
                        <h1>{task.title}</h1>
                        <p>{task.description}</p>
                        <div className="d-flex justify-content-end">
                            <h3>{task.user.name}</h3>
                            <button className="btn btn-success" onClick={() => updateTaskStatus(task.id)}>{task.completed ? "Completed" : "To do"}</button>
                            <Link className="btn btn-primary" to={(`/edit-task/${task.id}`)}>Edit</Link>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}