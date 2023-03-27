import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react'
import "../styles/crypto.css";
import Card from "react-bootstrap/Card";
import Settings from "../components/Settings";
import Header from "../components/Header";
import TopCrypto from "../components/TopCrypto";
import "bootstrap/dist/css/bootstrap.min.css";

function Crypto() {

    let [listPost, setListPost] = useState([]);

    const [post, setPost] = useState([]);
    const [search, setSearch] = useState("bitcoin");

    useEffect(() => {
      // axios.get(`https://api.coingecko.com/api/v3/coins/${search}`).then((response) => {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${search}/`)
        .then((response) => {
          setPost([response.data]);
        });

      fetch("http://localhost:3002/crypto")
        .then((res) => res.json())
        .then((json) => {
          setListPost(json);
        });
    }, [search]);

    const submit = (event) => {
      event.preventdefault();
    };

    const handleChange = (event) => {
      setSearch(event.target.value);
      if (!event.target.value) {
        setSearch("bitcoin");
      }
    };

    return (
      <div>
        <Header></Header>

        <div className="container pt-5">
          <div className="row justify-content-center">
            <div className="col-6">
              <form onSubmit={submit}>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Cryptocurrency
                  </span>

                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Bitcoin..."
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {post.map((element) => {
          return (
            <div className="container">
              <div className="row main">
                <div className="header col-12">
                  <div className="price">
                    Current Price {element?.name} ({element?.symbol})
                  </div>

                  <div className="containers">
                    <div className="crypto logo">
                      <img src={element?.image?.small} alt="img" />
                    </div>
                    <div className="crypto name">{element?.name}</div>
                    <div className="crypto symbol">{element?.symbol}</div>
                    <div className="data right">
                      €{element?.market_data?.current_price?.eur}
                    </div>
                    {element?.market_data
                      ?.price_change_percentage_1h_in_currency?.eur > 0 ? (
                      <div className="data hour2">
                        {element?.market_data?.price_change_percentage_1h_in_currency?.eur?.toFixed(
                          2
                        )}
                        %
                      </div>
                    ) : (
                      <div className="data hour">
                        {element?.market_data?.price_change_percentage_1h_in_currency?.eur?.toFixed(
                          2
                        )}
                        %
                      </div>
                    )}
                  </div>

                  <div className="numbers">
                    <div className="rank">Rank: {element?.market_cap_rank}</div>
                  </div>
                </div>

                <div className="stats col-12">
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                      <div id="cap">
                        <div>
                          <p className="market">Cap Market</p>
                          <p>€{element?.market_data?.market_cap?.eur}</p>
                          {element?.market_data
                            ?.market_cap_change_percentage_24h > 0 ? (
                            <div className="datas hours2">
                              {element?.market_data?.market_cap_change_percentage_24h?.toFixed(
                                2
                              )}
                              %
                            </div>
                          ) : (
                            <div className="datas hours">
                              {element?.market_data?.market_cap_change_percentage_24h?.toFixed(
                                2
                              )}
                              %
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4">
                      <div id="mid">
                        <div>
                          <p className="market">
                            Lowest Rate <span className="span-jsx">24h</span>
                          </p>
                          <p>€{element?.market_data?.low_24h?.eur}</p>
                          <p className="p">%</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4">
                      <div id="circ">
                        <div>
                          <p className="market">
                            Highest Rate <span className="span-jsx">24h</span>
                          </p>
                          <p>€{element?.market_data?.high_24h?.eur}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {listPost.map((post, index) => {
                  return (
                    <div className="row">
                      <div className="col-7 pt-3">
                        {post.map((content) => {
                          return (
                            <div className="pb-4">
                              <Card>
                                <Card.Header className="card-head2">
                                  {content.ownerID.userName}
                                  <Settings />{" "}
                                </Card.Header>
                                <Card.Body>
                                  <blockquote className="blockquote mb-0">
                                    <p>{content.text}</p>
                                    <footer className="blockquote-footer">
                                      Posted {content.createdAt}
                                      <cite title="Source Title">{}</cite>
                                    </footer>
                                  </blockquote>
                                  <div className="pt-5">
                                    <div style={{}}>
                                      <span
                                        style={{ backgroundColor: "pink" }}
                                      ></span>
                                      <span
                                        style={{ backgroundColor: "orange" }}
                                      >
                                        {}
                                      </span>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                            </div>
                          );
                        })}
                      </div>

                      <TopCrypto content={search} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
}

export default Crypto