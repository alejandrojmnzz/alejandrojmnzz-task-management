import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<Link to="/">
					<button className="btn btn-secondary">Home</button>
				</Link>
				<div className="ml-auto">
					{
						store.token ?
							<>
								<Link to='/add-task' className="btn add-button-color me-2">Add Task</Link>
								<Link to='/' className="btn btn-danger" onClick={() => dispatch({ type: 'log_out' })}>Log Out</Link>


							</>
							:
							<>
								<Link to="/log-in">
									<button className="btn btn-primary me-2">Log In</button>
								</Link>
								<Link to="/sign-up">
									<button className="btn btn-primary">Sign Up</button>
								</Link>
							</>
					}

				</div>
			</div>
		</nav>
	);
};