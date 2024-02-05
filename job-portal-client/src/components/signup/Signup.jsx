import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		role: ""
		
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		console.log("handleChange called");
		setData({ ...data, [input.name]: input.value });
		console.log("Updated data:", data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(data);
			setLoading(true);

			console.log("Data before request:", data);
			const url = "http://localhost:5000/api/users";
			const { data: res } = await axios.post(url, data);
			setError("");
			navigate("/login");
			// console.log(res.message);
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
			} else {
				setError("An unexpected error occurred. Please try again later.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							pattern="[a-zA-Z]+"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							pattern="[a-zA-Z]+"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<select
							name="role"
							onChange={handleChange}
							value={data.role}
							required
							className={styles.input}
						>
							<option value="" disabled>
								Select Role
							</option>
							<option value="seeker">seeker</option>
							<option value="recruiter">recruiter</option>
						</select>

						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn} disabled={loading}>
							{loading ? "Signing Up..." : "Sign Up"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
