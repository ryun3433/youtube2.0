import React, { useEffect, useState } from "react";
import Axios from "axios";

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    let variable = { userTo: props.userTo };

    Axios.post("/api/subscribe/subscribeNumber", variable).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
        console.log(res.data);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다.");
      }
    });

    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };
    Axios.post("/api/subscribe/subscribed", subscribedVariable).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert("정보를 받아오지 못했습니다.");
      }
    });
  }, []);

  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
      //userFrom: localStorage.getItem("userId"),
    };
    if (Subscribed) {
      Axios.post("/api/subscribe/unSubscribe", subscribedVariable).then(
        (res) => {
          if (res.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독 취소에 실패했습니다.");
          }
        }
      );
    } else {
      Axios.post("/api/subscribe/subscribe", subscribedVariable).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독에 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "5px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? "subscribed" : "subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
