import React from "react"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'


function Seetings(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [value,setValue] = useState(props.value)
    const [commentVal,setCommentVal] = useState(props.commentVal)
    const current = props.current
    const currentP = props.currentP
   
    const changer = e =>{
        e.preventDefault()
        setValue(e.target.value)
    }
    const commentChanger = e =>{
        e.preventDefault()
        setCommentVal(e.target.value)
    }
    const comment = localStorage.getItem('commentBody')
    const postID = props.postID;
    

    const editor =e=>{
        e.preventDefault()
        fetch('http://localhost:3002/post/edit', {
            method:'PUT',
            headers:new Headers({"content-type": "application/json"}),
            body:JSON.stringify({
                postID:postID,
                text:value
            })
        }).then(result=>result.json())
        .then(json=>{
            console.log(json)
            props.likeFunc(json)
        })
        handleClose()
    }

    const deletePost = e =>{
        e.preventDefault()
        fetch('http://localhost:3002/post',{
            method:'DELETE',
            headers:new Headers({"content-type":"application/json"}),
            body:JSON.stringify({
                postID:postID
            })
        }).then(result=>result.json())
        .then(json=>{
            console.log(json)
            props.likeFunc(json)
        })
    }
    const commentId = props.commentID
    const commentEditor = e =>{
        e.preventDefault()
        fetch('http://localhost:3002/comment',{
            method:'PUT',
            headers:new Headers({"content-type":"application/json"}),
            body:JSON.stringify({
                id:commentId,
                text:commentVal
            })
        }).then(result=>result.json())
        .then(json=>{
            console.log(json)
            props.refresher(json)
        })
    }

    const commentDelete = e =>{
        e.preventDefault()
        fetch('http://localhost:3002/comment',{
            method:'DELETE',
            headers:new Headers({"content-type":"application/json"}),
            body:JSON.stringify({
                id:props.commentID,
                postID:props.postID
            })
        }).then(result=>result.json())
            .then(json=>{
                console.log(json)
                props.refresher(json)
            })
    }





    useEffect(()=>{
        if(props.value !== value){
            setValue(props.value)
        }else if(props.profileCommentText !== proCommentVal){
            setProCommentVal(props.profileCommentText)
        }else if(props.commentVal !== commentVal){
            setCommentVal(props.commentVal)
        }
    },[props.value])
    const currentProfile = props.currentProfile;
    const profilePostText = props.profilePostText;
    const profilePostId = props.profilePostId;
    const profileCommentText = props.profileCommentText;
    const profileCommentId = props.profileCommentId;
    const [proCommentVal, setProCommentVal] = useState(props.profileCommentText)
    const [proPostVal, setProPostVal] = useState(profilePostText)
    const proPostChanger =e=>{
        e.preventDefault()
        setProPostVal(e.target.value)
    }

    const proCommentChanger =e=>{
        e.preventDefault()
        setProCommentVal(e.target.value)
    }


    const proCommentEditor = e =>{
        e.preventDefault()
        fetch('http://localhost:3002/comment',{
            method:'PUT',
            headers:new Headers({"content-type":"application/json"}),
            body:JSON.stringify({
                id:profileCommentId,
                text:proCommentVal
            })
        }).then(result=>result.json())
        .then(json=>{
            console.log(json)
            props.refresher(json)
        })
    }

    const proEditor =e=>{
        e.preventDefault()
        fetch('http://localhost:3002/post/edit', {
            method:'PUT',
            headers:new Headers({"content-type": "application/json"}),
            body:JSON.stringify({
                postID:profilePostId,
                text:proPostVal
            })
        }).then(result=>result.json())
        .then(json=>{
            console.log(json)
            props.updater(json)
        })
        handleClose()
    }

    const proCommentDelete = e =>{
        e.preventDefault()
        fetch('http://localhost:3002/comment',{
            method:'DELETE',
            headers:new Headers({"content-type":"application/json"}),
            body:JSON.stringify({
                id:profilePostId
            })
        }).then(result=>result.json())
            .then(json=>{
                console.log(json)
                props.refresher(json)
            })
    }

    const proDeletePost = e =>{
        e.preventDefault()
        fetch('http://localhost:3002/post',{
            method:'DELETE',
            headers:new Headers({"content-type":"application/json"}),
            body:JSON.stringify({
                postID:profilePostId
            })
        }).then(result=>result.json())
        .then(json=>{
            console.log(json)
            props.updater(json)
        })
    }
   const shPostID = props.sharedPostId;

    const proShareDelete = (e) =>{
        e.preventDefault()
        fetch('http://localhost:3002/share',{
            method:'DELETE',
            headers:new Headers({"content-type": "application/json"}),
            body:JSON.stringify({
                id:shPostID
            })
        }).then(result=>result.json())
        .then(json=>{
            console.log(json)
            props.updater(json)
        })
    }
    return (
        <>
            <Button variant="outline-ligh" onClick={handleShow}> <FontAwesomeIcon icon="fa-solid fa-ellipsis" /> </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Edit content</Form.Label>
                           {currentP ? <Form.Control as="textarea" value={value} onChange={changer} rows={2}></Form.Control>
                           :current ?
                           <Form.Control as="textarea" value={commentVal} onChange={commentChanger} rows={2}></Form.Control>
                           :currentProfile === "post"?
                           <Form.Control as="textarea" value={proPostVal} onChange={proPostChanger} rows={2}></Form.Control>
                           :currentProfile === "comment"?
                           <Form.Control as="textarea" value={proCommentVal} onChange={proCommentChanger} rows={2}></Form.Control>
                           :<p></p>
                        }
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                 {currentP ? 
                  <Button variant="danger" onClick={deletePost}>Delete content</Button>
                  : current ?
                  <Button variant="danger" onClick={commentDelete}>Delete content</Button>
                  :currentProfile === "post"?
                  <Button variant="danger" onClick={proDeletePost}>Delete content</Button>
                  :currentProfile === "comment"?
                  <Button variant="danger" onClick={proCommentDelete}>Delete content</Button> 
                  :shPostID ?
                  <Button variant="danger" onClick={proShareDelete}>Delete content</Button>
                  : <p></p>
                  }
                    {currentP ? 
                    <Button variant="primary" onClick={editor}>Update</Button>
                    : current?
                    <Button variant="primary" onClick={commentEditor}>Update</Button>
                    :currentProfile === 'post'?
                    <Button variant="primary" onClick={proEditor}>Update</Button>
                    :currentProfile === 'comment' ? 
                    <Button variant="primary" onClick={proCommentEditor}>Update</Button>
                    : <p></p> }
                    
              
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Seetings