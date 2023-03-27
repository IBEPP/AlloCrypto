import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";

function Articles() {

    let [Articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('http://api.mediastack.com/v1/news?access_key=3198ddc6c880301b60340f1e3fed01e9&languages=fr&keywords=bitcoin&offset=2&limit=5')
            .then(res => res.json())
            .then(res => {
                setArticles(res.data) 
            })
    }, [])

    return (

        <div className="col-12  pt-5">
            <Card>
                <Card.Header>Worldwide Press Article (French-speakers)</Card.Header>

                <Card.Body>
                    <ListGroup as="ol" numbered>

                        {Articles.map(list => {

                            return (

                                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">

                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{list.title}</div>
                                        <p className="mb-2 text-muted">{list.source}</p>
                                        <p className="text-justify">{list.description}</p>
                                        <div>
                                            <a href={list.url} target="_blank" className="fw-bold">Read more</a>
                                        </div>
                                    </div>
                                    
                                    <Badge bg="secondary" pill> {list.country} </Badge>

                                </ListGroup.Item>
                            )
                        })}

                    </ListGroup>
                </Card.Body>
            </Card>
        </div>

    )
}

export default Articles;
