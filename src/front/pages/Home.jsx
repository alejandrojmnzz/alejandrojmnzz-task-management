import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { AllTask } from "../components/AllTasks.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()



	useEffect(() => {

	}, [])

	return (
		<AllTask/>
	);
}; 