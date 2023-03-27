import React, { useContext } from "react";
import ToPost from "../components/ToPost";
import Post from "../components/Post";
import TopUserLike from "../components/TopUserLike";
import TopUserComment from "../components/TopUserComment";
import Articles from "../components/Articles";
import "../styles/home.css";
import { useState, useEffect } from "react";
import { lenContext } from "../App";
import Header from "../components/Header";

function Home() {
  let { func } = useContext(lenContext);

  let [listPost, setListPost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/post")
      .then((res) => res.json())
      .then((res) => {
        setListPost(res.result);
      });
  }, []);

  const onFinishPost = (resultJson) => {
    console.log(resultJson);
    fetch("http://localhost:3002/post")
      .then((res) => res.json())
      .then((res) => {
        console.log("onfinishpost", res);
        setListPost(res.result);
      });
  };

  const likeBar = (ids, likers) => {
    fetch(`http://localhost:3002/post/${ids}`)
      .then((res) => res.json())
      .then((result) => {
        return (likers = result[0].likes.length);
      });
  };

  return (
    <div>
      <Header></Header>

      <div className="homeContainer container">
        <div className="bloc1">
          <ToPost onFinishPost={onFinishPost}></ToPost>

          <div>
            {listPost.map((post) => {
              return <Post likeFunc={onFinishPost} content={post}></Post>;
            })}
          </div>
        </div>

        <div className="row bloc2">
          <TopUserLike></TopUserLike>
          <TopUserComment></TopUserComment>
          {/* <Articles></Articles> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
