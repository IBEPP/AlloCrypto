import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/signup.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from 'axios';
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userError, setUserError] = useState(false);
  const Navigate = useNavigate();

  const onSubmit = (data) => {
    fetch("http://localhost:3002/user", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        userName: data.username,
        aboutMe: data.bio,
        picture: file,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.Error === false) {
          Navigate("/signup");
          setUserError(true);
        } else {
          Navigate("/");
          console.log(json);
        }
      });
  };
  const uploadedImage = React.useRef(null)
  const imageUploader = React.useRef(null)
  const [myImage, setImage] = useState('')
  const [file,setFile] = useState('');
  const [opacity,setOpacity] = useState('')
  const [border,setBorder] = useState('0.5px solid gold')

  const imageChanger = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      setImage(e.target.files[0])
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  const uploadImage = e =>{
    e.preventDefault();
    const formData = new FormData()
    formData.append('myImage', myImage)
    axios({
      method:"post",
      url:'http://localhost:3002/upload-image',
      data:formData
    })
    .then(result=>{
      const {data} = result;
      setFile(data.url)
      localStorage.setItem('userImg', data.url)
    })
    .catch(err=>{
      console.log(err);
    });
  }

  return (
    <div>
      <div>
        <img
          className="logo-signup"
          src="/img/logo-allo_crypto.png"
          alt="logo-crypto"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ overflow: "hidden", color: "gold", fontWeight: 700 }}
      >
        <h1 style={{ textAlign: "center" }}> Sign Up </h1>

        <div class="row justify-content-center">
          <div class="col-6">
            <div 
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
            >
              <input type="file" accept='/image*' ref={imageUploader} onChange={imageChanger} style={{display:'none'}}/>
              <div
                style={{
                  height: "110px",
                  width: "110px",
                }}
                onClick={() =>{ 
                  imageUploader.current.click()
                  setOpacity('hidden')
                  setBorder('none')
               
                }}
              >
                <img
                  ref={uploadedImage}
                  style={{
                    width: "9%",
                    height: "16%",
                    position: "absolute",
                    left:'45.5%',
                    backgroundColor:'transparent',
                    border:border,
                    marginTop:'20px'
                  }}
                />
                <span style={{position:'absolute', fontSize:'50px', color:'gold',top:'31.9%',left:'49%',fontWeight:'lighter',cursor:'pointer',visibility:opacity}}>+</span>
              </div>
                <button onClick={uploadImage} style={{position:'absolute',top:'46.5%',left:'46.5%'}}>Upload</button>
            </div>
            <div class="mb-3" style={{marginTop:'80px'}}>
              <label>Username</label>
              <input
                {...register("username", { required: true })}
                placeholder="Username please"
                type="text"
                className="form-control"
                name="username"
              />
              {errors.username && (
                <span className="btn btn-dark">Username required</span>
              )}
              {userError === true && (
                <span className="btn btn-dark">Username already exists</span>
              )}
            </div>

            <div className="mb-3">
              <label>Bio</label>
              <textarea
                {...register("bio", { required: true })}
                placeholder="About you please"
                type="text"
                className="form-control"
                name="bio"
              />
              {errors.bio && (
                <span className="btn btn-dark">
                  Please give an overview about yourself
                </span>
              )}
            </div>
            <button
              style={{ margin: "auto", display: "block" }}
              type="submit"
              className="btn btn-warning"
            >
              Signup
            </button>

            <br />

            <div>
              <button
                style={{ margin: "auto", display: "block" }}
                className="btn btn-dark"
              >
                <Link style={{ textDecoration: "none" }} to="/">
                  Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
