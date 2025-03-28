import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<button className="btn btn-secondary">Home</button>
				</Link>
				<div className="ml-auto">
					{
						store.token ?
							<>

								<Link to='/' className="btn btn-danger" onClick={() => dispatch({ type: 'log_out' })}>Log Out</Link>


							</>
							:
							<>
								<Link to="/log-in">
									<button className="btn btn-primary">Log In</button>
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