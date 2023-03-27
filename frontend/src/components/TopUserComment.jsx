import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react"; 

function TopUserComment() {

    let [topUserComment, setTopUserComment] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3002/user/topcomments')
            .then(res => res.json())
            .then(res => {
                setTopUserComment(res)
            })
    }, [])

    return (

        <div className="col-12 pt-5">
        <Card>
            <Card.Header>Top User Comment</Card.Header>

            <Card.Body>
                <ListGroup as="ol" numbered>

                    {topUserComment.map(list => {

                        return (

                            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">

                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{list.userName}</div>
                                    <p>{list.aboutMe}</p>
                                </div>

                                <Badge bg="success" pill> {list.commentsGlobal} </Badge>

                            </ListGroup.Item>
                        )
                    })}

                </ListGroup>
            </Card.Body>
        </Card>
    </div>

    )
}

export default TopUserComment