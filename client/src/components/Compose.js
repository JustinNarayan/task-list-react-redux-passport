import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../store/actions/commentActions";

const Compose = () => {
	const { loading } = useSelector((state) => state.commentAdd);
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [body, setBody] = useState("");
	const [email, setEmail] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(addComment({ name, body, email }));
	};

	return (
		<>
			{loading ? (
				<h4>Loading</h4>
			) : (
				<form onSubmit={(e) => onSubmit(e)}>
					<input
						type="text"
						id="username"
						placeholder="Comment name"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						id="email"
						placeholder="Comment email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<textarea
						id="body"
						placeholder="Comment body"
						onChange={(e) => setBody(e.target.value)}
					></textarea>
					<button>Add Comment</button>
				</form>
			)}
		</>
	);
};

export default Compose;
