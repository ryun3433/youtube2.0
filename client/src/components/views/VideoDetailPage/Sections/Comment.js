import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

function Comment(props) {
  const videoId = props.postId;

  const user = useSelector((state) => state.user);
  const [commentValue, setcommentValue] = useState("");

  const handleClick = (e) => {
    setcommentValue(e.currentTarget.value);
  };

  const variable = {
    content: commentValue,
    writer: user.userData._id,
    postId: videoId,
  };

  const onSubmit = (e) => {
    console.log(variable);
    e.preventDefault();
    Axios.post("/api/comment/saveComment", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data.result);
      } else {
        alert("코맨트를 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comment Lists */}

      {props.commentList &&
        props.commentList.map((comment, index) => (
          <SingleComment key={index} comment={comment} postId={videoId} />
        ))}
      {/* Root Comment Form */}

      <from style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />

        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </from>
    </div>
  );
}
export default Comment;
