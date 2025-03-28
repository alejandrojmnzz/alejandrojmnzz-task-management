import React from "react";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function EditTask() {
    const { store, dispatch } = useGlobalReducer()
    const [task, setTask] = useState({
        title: "",
        description: ""
    })

    const [alert, setAlert] = useState({
        'show': false,
        'success': true,
        'message': ""
    })
    const { id } = useParams()
    const navigate = useNavigate()

    function handleChange({ target }) {
        setTask({
            ...task,
            [target.name]: target.value
        })
    }


    async function handleSubmit(event) {
        event.preventDefault()

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
        

        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,
                {
                    method: 'PUT',
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
                setTimeout(() => {
                    navigate('/')
                  }, "1000");
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
            let taskToEdit = store.tasks.filter((item) => item.id == id)
            setTask({
                ["title"]: taskToEdit[0].title,
                ["description"]: taskToEdit[0].description
            })
        }
    }
    useEffect(() => {
        getTasks()

    }, [])

    useEffect(() => {
        getTask()

    }, [store.tasks])

    return (
        <div className="container d-flex justify-content-center">
            <form className="w-50" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <textarea type="text" name="title" className="form-control w-100 auto-size" value={task.title} onChange={handleChange} />

                <label htmlFor="description">Description</label>
                <textarea name="description" className="form-control w-100 auto-size" value={task.description} onChange={handleChange} />

                <button type="submit" className="btn btn-primary">Edit Task</button>

                {
                    alert.show &&
                    alert.success ?
                        <div className="alert alert-success mt-2" role="alert">
                            Task edited!
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