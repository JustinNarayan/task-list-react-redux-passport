import React from "react";

const Comment = ({ comment }) => {
	return (
		<div className="comment-card">
			<p className="comment-name">{comment.name}</p>
			<p className="comment-email">{comment.email}</p>
			<p className="comment-body">{comment.body}</p>
		</div>
	);
};

export default Comment;
