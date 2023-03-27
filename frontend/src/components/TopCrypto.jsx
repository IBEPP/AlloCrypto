import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { useState, useEffect } from "react";

function TopCrypto(props) {
  const [post, setPost] = useState([]);
  let [Articles, setArticles] = useState([]);

  const receiveAmount = props.content;
  const sendAmount = props.content;

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => {
        setPost(response.data.coins);
      });

    fetch(
      `http://api.mediastack.com/v1/news?access_key=8837fcd31cd5b6a2601e8addd11e49dc&languages=en&keywords=${receiveAmount}&offset=0&limit=5`
    )
      .then((res) => res.json())
      .then((res) => {
        setArticles(res.data);
      });

    fetch(
      `http://api.mediastack.com/v1/news?access_key=8837fcd31cd5b6a2601e8addd11e49dc&languages=en&keywords=${sendAmount}&offset=0&limit=5`
    )
      .then((res) => res.json())
      .then((newsjson) => {});
  }, [receiveAmount, sendAmount]);

  return (
    <div className="col-5 pt-3">
      <div className="col-12">
        <Card>
          <Card.Header>
            Top-7 trending coins on CoinGecko in the last 24 hours
          </Card.Header>

          <Card.Body>
            <ListGroup as="ol" numbered>
              {post.map((element) => {
                return (
                  <ListGroup.Item as="li">
                    <img src={element?.item?.small} className="topCrypto-img" />
                    {element.item.symbol} ➜ {element.item.id}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>

      <div className="col-12 pt-4">
        <Card>
          <Card.Header>Worldwide Press Article (English-speakers)</Card.Header>

          <Card.Body>
            <ListGroup as="ol" numbered>
              {Articles.map((list) => {
                return (
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{list.title}</div>
                      <p className="mb-2 text-muted">{list.source}</p>
                      <p className="text-justify">{list.description}</p>
                      <div>
                        <a href={list.url} target="_blank">
                          Article Link
                        </a>
                      </div>
                    </div>

                    <Badge bg="secondary" pill>
                      {" "}
                      {list.country}{" "}
                    </Badge>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default TopCrypto;
