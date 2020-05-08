import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comments from "./Sections/Comments";
import LikeDislikes from "./Sections/LikeDislikes";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [VideoDetail, setVideoDetail] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [Views, setViews] = useState(0);

  useEffect(() => {
    Axios.post("/api/video/getVideoDitail", variable).then((res) => {
      if (res.data.success) {
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("비디오 정보를 가져오길 실패했습니다.");
      }
    });
    Axios.post("/api/comment/getComment", variable).then((res) => {
      if (res.data.success) {
        setCommentLists(res.data.comments);
        console.log(res.data.comments);
      } else {
        alert("코멘트 정보를 가져오는 것을 실패 하였습니다.");
      }
    });
    Axios.post("/api/video/updateViews", variable).then((res) => {
      if (res.data.success) {
        setViews(res.data.views);
      } else {
        console.log("조회수를 올리는데 실패하였습니다.");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  if (VideoDetail.writer) {
    const subscribeButton = VideoDetail.writer._id !==
      localStorage.getItem("userId") && (
      <Subscribe
        userTo={VideoDetail.writer._id}
        userFrom={localStorage.getItem("userId")}
      />
    );

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100% " }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            />

            <List.Item
              actions={[
                <span>{Views}views</span>,
                <LikeDislikes
                  userId={localStorage.getItem("userId")}
                  videoId={videoId}
                />,
                subscribeButton,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} />}
                title={VideoDetail.writer.name}
                description={VideoDetail.description}
              />
            </List.Item>
            <Comments
              refreshFunction={refreshFunction}
              commentLists={CommentLists}
              postId={videoId}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default VideoDetailPage;
