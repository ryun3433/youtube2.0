import React, { useState } from "react";
import Axios from "axios";
import { Comment, Avatar, Button, Input } from "antd";
function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.CommentValue);
  };

  //   const variable = {
  //     content: CommentValue,
  //     writer: user.userData._id,
  //     postId: props.postId,
  //     //responseTo:
  //   };

  const onSubmit = (e) => {
    e.preventDefault();
    // Axios.post("/api/comment/saveComment", variable).then((res) => {
    //   if (res.data.success) {
    //     console.log(res.data.result);
    //   } else {
    //     alert("코맨트를 저장하지 못했습니다.");
    //   }
    // });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      {" "}
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={<p> {props.comment.content}</p>}
      />
      {OpenReply && (
        <from style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
          />

          <br />
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </button>
        </from>
      )}
    </div>
  );
}

export default SingleComment;
