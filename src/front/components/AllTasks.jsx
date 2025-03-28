import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function AllTask() {

    const { store, dispatch } = useGlobalReducer()

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
            if (!response.status == 401) {
                dispatch({ type: 'log_out' })
            }
        } catch (error) {

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

    async function deleteTask(id) {
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,
                {
                    method: 'DELETE',
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
        if (store.token) {
            getTasks()
        }
    }, [])
    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Your Tasks</h1>

            {
                store.token ?
                    store.tasks.map((task, index) => {
                        return (
                            <div key={index} className="task-list d-flex justify-content-between">
                                <div className="ms-2">
                                    <Link to={`/task/${task.id}`} className="task-title">{task.title}</Link>



                                    <p className="task-description">{task.description.split("").map((letter, index) => {

                                        if (index < 60) {
                                            return (
                                                letter
                                            )
                                        }
                                        else if (index == 61) {
                                            return (
                                                '...'
                                            )
                                        }

                                    }
                                    )}</p>

                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="me-4">
                                        <Link className="task-buttons" to={(`/edit-task/${task.id}`)}><i className="fa-solid fa-pen"></i></Link>
                                        <button className="task-buttons" onClick={() => deleteTask(task.id)}><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                    <div className="task-status h-100">
                                        <button className="fs-3 task-buttons m-0 h-100" onClick={() => updateTaskStatus(task.id)}>{task.completed ?
                                            <>

                                                <div className="d-flex align-items-end h-50 justify-content-center">
                                                    <i className="fa-solid fa-check text-success"></i>
                                                </div>
                                                <p className="status-text m-0 ">Done</p>

                                            </>
                                            :
                                            <>

                                                <div className="d-flex align-items-end h-50 justify-content-center">
                                                    <i className="fa-solid fa-bars-progress text-secondary"></i>
                                                </div>
                                                <p className="status-text m-0 ">Todo</p>

                                            </>
                                        }</button>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="d-flex justify-content-center">
                        <p>You must log in to see your tasks!</p>
                    </div>
            }
        </div>
    )
}