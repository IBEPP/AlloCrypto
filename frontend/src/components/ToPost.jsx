import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import '../styles/home.css';
import axios from "axios";

function ToPost(props) {

    const [userName, setName] = useState('')
    const [bio, setBio] = useState('')
    const [crypto,setCrypto] = useState('crypto')
    
    useEffect(() => {
        const userName = localStorage.getItem('userName')
        const bio = localStorage.getItem('bio')
        setName(userName)
        setBio(bio)
        
    })
    
    const [value, setValue] = useState('')
    const userId = localStorage.getItem('userId')
    
    const sender = (e) => {
        e.preventDefault()           
        let valer;
             fetch('http://localhost:3002/post', {
                method: 'POST',
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify({
                text: value,
                ownerID: userId
             })
             }).then(result => result.json())
                .then(json => {
                localStorage.setItem('postfrontId', JSON.stringify(json.postId))
                console.log("json.postID", json.postId)
                props.onFinishPost(json);
            })
    }
    const [text,setText] = useState('')

    const cryptoSender = (e)=>{
        e.preventDefault()
        fetch(`http://localhost:3002/${crypto}`,{
            method:'POST',
            headers:new Headers({"content-type":"application/json"}),
            body:JSON.stringify({
                text:value,
                ownerID:userId
            })
        }).then(result=>result.json())
         .then(json=>{
            console.log(json)
            window.location.href = '/cryptomonaie';
        })
       
    }


    const changer = (e) => {
        setValue(e.target.value)
    }

    const userImage = localStorage.getItem('userImg')

    return (

        <div className="row">
            <div className="col-11 pt-5">
                <Card>
                    <Card.Header>{userName}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <div>
                                <img className="" src={userImage} alt="Logo" />
                                <h5 className="card-title pt-2">{bio}</h5>
                                <div className="cryptoPage">
                                    <span>{text}</span>
                                </div>
                            </div>
                            <form>

                                <input type="text" className="form-control form-control-dark" placeholder="Give the community your tip of the day" onChange={changer} />
                                <div className="text-end">

                                  { 
                                   value.includes('#')? <button type="submit" className="btn btn-primary mt-3 " onClick={cryptoSender}> New Post</button> :
                                  <button type="submit" className="btn btn-primary mt-3 " onClick={sender}> New Post</button>
                                  }
                                </div>
                            </form>
                        </blockquote>
                    </Card.Body>
                </Card>
            </div>
        </div>

    )
}

export default ToPost