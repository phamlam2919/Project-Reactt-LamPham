import React, { useEffect, useState } from "react";
import Header from "../../commons/header/Header";
import "./login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Footer from "../../commons/footer/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";

function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        cart: "",
    });
    const { email, password, cart } = loginData;
    const [loginErrors, setLoginErrors] = useState({});
    const [registeredUsers, setRegisteredUsers] = useState([]);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/users")
            .then((response) => {
                setRegisteredUsers(response.data);
            })
            .catch((error) => {
                console.error("Lỗi", error);
            });
    }, []);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!email) {
            validationErrors.email = "Vui lòng nhập email";
        } else if (!isValidEmail(email)) {
            validationErrors.email = "Địa chỉ email không hợp lệ";
        }
        if (!password) {
            validationErrors.password = "Vui lòng nhập mật khẩu";
        } else if (!isValidPassword(password)) {
            validationErrors.password = "Mật khẩu phải chứa ít nhất 6 ký tự";
        }

        const user = registeredUsers.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            if (user.locked) {
                Swal.fire(
                    "Tài khoản đã bị khóa",
                    "Vui lòng liên hệ với quản trị viên để biết thêm chi tiết",
                    "warning"
                );
            } else {
                localStorage.setItem("userId", user.id);
                console.log("Đăng nhập thành công!");
                Swal.fire(
                    "Good job!",
                    "Đăng Nhập Thành Công!",
                    "success",
                    "OK"
                ).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    }
                });
            }
        } else {
            setLoginErrors({ email: "Email hoặc mật khẩu không chính xác" });
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 6;
    };

    return (
        <div>
            <Header />
            <div className="img-login">
                <div>
                    <img
                        className="anh"
                        src="https://static.kfcvietnam.com.vn/images/web/signin/lg/signin.jpg?v=gOXpk3"
                        alt=""
                    />
                </div>
                <div className="form-login">
                    <h2>ĐĂNG NHẬP</h2>
                    <div>
                        <Form onSubmit={handleLoginSubmit}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleLoginChange}
                                    placeholder="Enter email"
                                />
                                {loginErrors.email && (
                                    <span className="error">
                                        <Alert variant="danger">
                                            {loginErrors.email}
                                        </Alert>
                                    </span>
                                )}
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleLoginChange}
                                    placeholder="Password"
                                />
                                {loginErrors.password && (
                                    <span className="error">
                                        <Alert variant="danger">
                                            {loginErrors.password}
                                        </Alert>
                                    </span>
                                )}
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Đăng nhập
                            </Button>
                        </Form>
                    </div>
                    <div className="buttonn">
                        <h5>Hoặc tiếp tục với</h5>
                        <button className="btn-8">
                            <span>
                                <i className="fa-brands fa-facebook-f"></i> Đăng
                                nhập bằng facebook
                            </span>
                        </button>
                        <button className="btn-9">
                            <span>
                                <i className="fa-brands fa-apple"></i> Đăng nhập
                                bằng apple
                            </span>
                        </button>
                        <button className="btn-10">
                            <span>
                                <i className="fa-brands fa-google"></i> Đăng
                                nhập bằng google
                            </span>
                        </button>
                        <p>
                            Bạn chưa có tài khoản?
                            <NavLink to="/register">Đăng ký</NavLink>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
