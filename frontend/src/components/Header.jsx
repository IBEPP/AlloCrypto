import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom';




function Header() {

    const [value, setValue] = useState('')
    let navigate = useNavigate();

    const getValue = (e) => {
        setValue(e.target.value)
        console.log(e.target.value);
    }
    const userName = localStorage.getItem('userName')

    const checkUser = (e) => {

        e.preventDefault()
        console.log("search user value", value);

        fetch(`http://localhost:3002/user/${value}`)
            .then(res => res.json())
            .then(user => {
                console.log("resultat du user", user["user"]);
                if (user.ok) {
                    localStorage.setItem("searchUser", user["user"].userName);
                    localStorage.setItem("searchBio", user["user"].aboutMe);
                    navigate(`/profil/${user["user"]._id}`)
                    console.log(user["user"].picture)
                    localStorage.setItem('searchedUser', user["user"].picture)
                }
                else {
                    alert("user not find, please try again")
                }
            })
    }

    return (
        <div>
            <header className="p-3 bg-dark text-white">
                <div className="container">

                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                        <a className="navbar-brand text-warning fw-bold" href="http://localhost:3000/home">AlloCrypto</a>

                        <nav className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <NavLink className="nav-link text-white" aria-current="page" to="/home">Home</NavLink>
                            <NavLink className="nav-link px-2 text-white" to="/profil">Profile</NavLink>
                            <NavLink className="nav-link px-2 text-white" to="/cryptomonaie">Cryptocurrency</NavLink>
                        </nav>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">

                            <div className="input-group">
                                <button onClick={checkUser} className="btn btn-success" type="button" id="button-addon1">Search User</button>
                                <input onChange={getValue} type="search" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Search User..." />
                            </div>

                        </form>

                        <button type="button" className="btn btn-warning" onClick={()=>{
                            navigate('/')
                        }} onMouseEnter={()=>{

                        }}>Log Out</button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header