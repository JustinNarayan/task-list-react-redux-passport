import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComments } from "../store/actions/commentActions";

import Comment from "./Comment";

const CommentList = () => {
	const { loading, comments } = useSelector((state) => state.commentList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listComments());
	}, [dispatch]);

	return (
		<>
			{loading ? (
				<h4>Loading</h4>
			) : (
				<>
					{comments.map((comment) => (
						<h1 key={comment.id}>
							<Comment comment={comment} />
						</h1>
					))}
				</>
			)}
		</>
	);
};

export default CommentList;
