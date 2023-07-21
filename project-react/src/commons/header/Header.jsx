import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const userId = localStorage.getItem("userId");
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/users/${userId}`)
            .then((res) => {
                setUser(res.data);
                setLoggedIn(true);
                if (res.data.locked) {
                    handleLogout();
                }
            })
            .catch((err) => console.log(err));
    }, []);

    console.log(loggedIn);
    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate("/login");
    };
    return (
        <div className="header">
            <div className="header1">
                <div className="kfc">
                    <NavLink to="/">
                        <img
                            src="https://kfcvn-static.cognizantorderserv.com/images/web/kfc-logo.svg?v=5.0"
                            alt=""
                        />
                    </NavLink>
                    <h2>
                        <NavLink className="black" to="/shop">
                            Thực Đơn
                        </NavLink>
                    </h2>
                    <h2>Khuyến Mãi</h2>
                    <h2>Hệ Thống Cửa Hàng</h2>
                </div>
                <div className="login">
                    <NavLink to="/cart">
                        <div className="a-href">1</div>
                    </NavLink>
                    {loggedIn ? (
                        // <Link to="/login" className="username1">
                        <div className="username">
                            <i class="fa-solid fa-user"></i>
                            {user.name}
                        </div>
                    ) : (
                        // </Link>
                        <Link to="/login" className="profile-icon">
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small/profile-icon-login-head-icon-vector.jpg"
                                alt=""
                            />
                        </Link>
                    )}

                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0bsBH-w_rE9dIDMcIadk_7W_QMrUTO0TyZqDxKi9t24e_nosOw8MCpy_9YuXUmu7ff4I&usqp=CAU"
                        alt=""
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
