import "../styles/profil.css";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListComments from "../components/ListComments";
import Settings from "../components/Settings";
import TopUserComment from "../components/TopUserComment";
import TopUserLike from "../components/TopUserLike";
import { motion } from 'framer-motion';
import Header from "../components/Header";
import { useParams } from 'react-router-dom';
import Badge from "react-bootstrap/Badge";

function Profil() {

    const [name, setName] = useState('')
    const [postBorder, setBorder] = useState('2px solid white')
    const [commentBorder, setCBorder] = useState('2px solid white')
    const [shareBorder, setShBorder] = useState('2px solid white')
    const [posts, setPost] = useState([])
    const [currentUser, setUser] = useState('')
    let userId = localStorage.getItem('userId')
    const [opacity, setOpacity] = useState('')
    const [current, setCurrent] = useState('')

    const [newName, setNewName] = useState(localStorage.getItem('userName'))
    const [newBio, setNewBio] = useState(localStorage.getItem('bio'))
    const [newPic,setPic] = useState(localStorage.getItem('userImg'))

    let { id } = useParams()

    useEffect(() => {

        if (id) {
            userId = id;
            setNewName(localStorage.getItem('searchUser'));
            setNewBio(localStorage.getItem('searchBio'));
            setPic(localStorage.getItem('searchedUser'))
        }
        fetch(`http://localhost:3002/post/profil/${userId}`)
            .then(result => result.json())
            .then(json => {
                setPost(json)
                setCurrent('post')

            })

    }, [])


    const Updater = (result) => {
        fetch(`http://localhost:3002/post/profil/${userId}`)
            .then(result => result.json())
            .then(json => {
                setPost(json)
            })
    }
    const getPost = (e) => {
        if (id) {
            userId = id;
        }
        e.preventDefault()
        fetch(`http://localhost:3002/post/profil/${userId}`)
            .then(result => result.json())
            .then(json => {
                setPost(json)
                setCurrent('post')
                setOpacity('visible')
            })
        setBorder('2px solid blue')
        setCBorder('2px solid white')
        setShBorder('2px solid white')
        setVisible('visible')

    }

    const getComment = (e) => {
        if (id) {
            userId = id;
        }
        e.preventDefault()
        fetch(`http://localhost:3002/comment/profil/${userId}`)
            .then(result => result.json())
            .then(json => {
                setPost(json)
                setCurrent('comment')
                setOpacity('hidden')
            })
        setCBorder('2px solid blue')
        setBorder('2px solid white')
        setShBorder('2px solid white')
        setVisible('hidden')

    
    }
    const [visible,setVisible] = useState('visible')
    const getShares = (e) => {
        if (id) {
            userId = id;
        }
        e.preventDefault()
        fetch(`http://localhost:3002/share/profil/${userId}`)
            .then(result => result.json())
            .then(json => {
                console.log(json)
                setPost(json)
                setCurrent('share')
            })
        setShBorder('2px solid blue')
        setBorder('2px solid white')
        setCBorder('2px solid white')
        setVisible('hidden')
    }

    const setLike = (id) => {
        fetch('http://localhost:3002/post', {
            method: 'PUT',
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                likerId: userId,
                filterId: id
            })
        }).then(result => result.json())
            .then(json => {
                Updater()
            })
    }
    const userImage = localStorage.getItem('userImg')
    const searched = localStorage.getItem('searchedUser')
    // "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
    return (
        <div>
            <Header></Header>

            <div className="main-div">
                <div className="background-photo">
                    <img src={newPic} className="image" alt="..." />
                </div>
                <div className="profile-content">
                    <div className="name-div">
                        <div>
                            <span className="first-span">{newName}</span>
                        </div>
                        <div>
                            <span className="second-span">{newBio}</span>
                        </div>
                        <div className="icons-div">
                            <a href="https://twitter.com/?logout=1653928220673" target="_blank"><FaTwitter className="icons" style={{ color: '#1DA1F2' }} /></a>
                            <a href="https://www.linkedin.com/home" target="_blank"><FaLinkedinIn className="icons" style={{ color: '#0072b1' }} /></a>
                            <a href="https://www.instagram.com/accounts/login/" target="_blank"><FaInstagram className="icons" style={{ color: '#8a3ab9' }} /></a>
                        </div>
                    </div>
                </div>
                <div className="btns-div">
                    <button style={{ borderBottom: postBorder }} onClick={getPost}>Posts</button>
                    <button style={{ borderLeft: '0.5px solid grey', borderBottom: commentBorder }} onClick={getComment}>Comments</button>
                    <button style={{ borderLeft: '0.5px solid grey', borderBottom: shareBorder, width: "inherit" }} onClick={getShares}>Shared by {newName}</button>
                </div>
            </div>

            <div className="container">

                <div className="row bloc-1">
                    <motion.div className="post-profil"
                        initial={{ x: '-100vw' }}
                        animate={{ x: -53 }}
                        transition={{ type: 'spring', duration: 1, bounce: 0.3 }}
                    >
                        {
                            posts.map(post => {

                                return (

                                    <div className="col-10 pt-5 pb-1">

                                        <Card>
                                            {current === 'share' ?
                                                <Card.Header className="card-head" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    {post.posterID.userName}
                                                    <Settings sharedPostId={post.id} updater={getShares}/>{" "}
                                                </Card.Header>
                                                : current === 'post' ?
                                                    <Card.Header className="card-head" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        {post.ownerID.userName}
                                                        <Settings profilePostText={post.text} profilePostId={post._id} currentProfile={"post"} updater={Updater} />{" "}
                                                    </Card.Header>
                                                    : current === 'comment' ?
                                                        <Card.Header className="card-head" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            {post.ownerID.userName}
                                                            <Settings profileCommentText={post.text} profileCommentId={post._id} currentProfile={"comment"} refresher={getComment} />{" "}
                                                        </Card.Header>
                                                        : <p></p>
                                            }
                                            <Card.Body>
                                                <blockquote className="blockquote mb-0">
                                                    {current === 'share' ? <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{post.postID?.ownerID.userName} <span style={{ fontSize: '15px', fontWeight: 'lighter', color: 'violet' }} className="replaced-span">created this post on {post.postID?.createdAt}</span></span> : <p></p>}
                                                    {current === 'share' ? <p>{post.postID?.text}</p> : <p>{post.text}</p>}
                                                    {current === 'comment' ?
                                                        <footer className="blockquote-footer">
                                                            Commented on {post.postID?.ownerID.userName + "'s "}post
                                                            <cite title="Source Title">{ }</cite>
                                                        </footer>
                                                        : current === 'post' ? <footer className="blockquote-footer">
                                                            Posted-{post.createdAt}
                                                            <cite title="Source Title">{ }</cite>
                                                        </footer>
                                                            :
                                                            <footer className="blockquote-footer">
                                                                {post.posterID.userName} shared this post
                                                                <cite title="Source Title">{ }</cite>
                                                            </footer>}
                                                </blockquote>
                                                <div className="pt-5" style={{ visibility: visible }}>
                                                    <Button
                                                        variant="outline-danger"
                                                        onClick={() => {
                                                            setLike(post._id);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon="heart" />
                                                    </Button>
                                                    <button
                                                        style={{
                                                            padding: "none",
                                                            border: "none",
                                                            backgroundColor: "white",
                                                            visibility:visible
                                                        }}
                                                        onClick={() => {
                                                           
                                                        }}
                                                    >
                                                        <ListComments
                        
                                                        />
                                                    </button>

                                                    <Button style={{visibility:visible}} variant="outline-secondary">
                                                        <FontAwesomeIcon icon="share" onClick={() => {
                                                            // shareContent(userId,props.content._id)
                                                        }} />
                                                    </Button>
                                                    <div >
                                                        <Badge className="ms-2 me-4" bg="danger" pill>
                                                            {current === "share" ? post.postID?.likes.length : current === 'post' ? post.likes?.length : <p></p>}
                                                        </Badge>

                                                        {/* <Badge bg="success" pill>  </Badge> */}
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </motion.div>

                    <div className="bloc2">


                        <TopUserLike />
                        <TopUserComment />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil