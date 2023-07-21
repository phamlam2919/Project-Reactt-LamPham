import React, { useState } from "react";
import Header from "../../commons/header/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./register.css";
import Footer from "../../commons/footer/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";

function Register() {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        id: uuidv4(),
        name: "",
        email: "",
        password: "",
        cart: [],
    });

    const { id, name, email, password } = newUser;
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        let hasErrors = false;
        if (!name) {
            validationErrors.name = "Vui lòng nhập tên";
            hasErrors = true;
        }
        if (!email) {
            validationErrors.email = "Vui lòng nhập email";
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            validationErrors.email = "Địa chỉ email không hợp lệ";
            hasErrors = true;
        }
        if (!password) {
            validationErrors.password = "Vui lòng nhập mật khẩu";
            hasErrors = true;
        } else if (!isValidPassword(password)) {
            validationErrors.password = "Mật khẩu phải chứa ít nhất 6 ký tự";
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(validationErrors);
        } else {
            axios
                .post("http://localhost:8000/users", newUser)
                .then(() => {
                    Swal.fire(
                        "Good job!",
                        "Đăng Ký Tài Khoản Thành Công!",
                        "success",
                        "OK"
                    ).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/login");
                        }
                    });
                })
                .catch((error) => {
                    console.error("Lỗi khi tạo tài khoản:", error);
                    Swal.fire("Oops...", "Lỗi khi tạo tài khoản!", "error");
                });
        }
    };
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]{6,}@gmail\.com$/;
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
                <div className="form-login1">
                    <h2>Tạo tài khoản</h2>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Name </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Name ??"
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <span className="error">
                                        {["danger"].map((variant) => (
                                            <Alert
                                                key={variant}
                                                variant={variant}
                                            >
                                                {errors.name}
                                            </Alert>
                                        ))}
                                    </span>
                                )}
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                />
                                {errors.email && (
                                    <span className="error">
                                        {["danger"].map((variant) => (
                                            <Alert
                                                key={variant}
                                                variant={variant}
                                            >
                                                {errors.email}
                                            </Alert>
                                        ))}
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
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <span className="error">
                                        {["danger"].map((variant) => (
                                            <Alert
                                                key={variant}
                                                variant={variant}
                                            >
                                                {errors.password}
                                            </Alert>
                                        ))}
                                    </span>
                                )}
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Tạo Tài Khoản
                            </Button>
                        </Form>
                        <p>
                            Bạn đã có tài khoản?
                            <NavLink to="/login">Đăng nhập</NavLink>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
