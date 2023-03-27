import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";

function TopUserLike() {

    let [topUserLike, setTopUserLike] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3002/user/toplikes')
            .then(res => res.json())
            .then(res => {
                setTopUserLike(res)
            })
    }, [])

    return (

        <div className="col-12  pt-5">
            <Card>
                <Card.Header>Top User Like</Card.Header>

                <Card.Body>
                    <ListGroup as="ol" numbered>

                        {topUserLike.map(list => {

                            return (

                                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">

                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{list.userName}</div>
                                        <p>{list.aboutMe}</p>
                                    </div>

                                    <Badge bg="danger" pill> {list.likesGlobal} </Badge>

                                </ListGroup.Item>
                            )
                        })}

                    </ListGroup>
                </Card.Body>
            </Card>
        </div>

    )
}

export default TopUserLike;
