import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../commons/header/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./pay.css";
import Footer from "../../commons/footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";

function Pay() {
    const [user, setUser] = useState({});
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        axios
            .get(`http://localhost:8000/users/${userId}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    console.log();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedUser = {
            ...user,
            cart: [],
        };
        axios
            .put(`http://localhost:8000/users/${userId}`, updatedUser)
            .then(() => {
                Swal.fire(
                    "Good job!",
                    "Đặt Hàng Thành Công!! Đơn hàng của bạn sẽ được giao tới trong ít phút nữa!!",
                    "success",
                    "OK"
                ).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    }
                });
            })
            .catch((error) => {
                console.error("Xóa giỏ hàng thất bại:", error.message);
            });
    };

    return (
        <div>
            <Header />
            <div className="pay">
                <div className="them">
                    <h4>THÊM THÔNG TIN CHI TIẾT:</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-left">
                                Họ và Tên
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Họ và Tên"
                                name="fullName"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Số Điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Số Điện thoại"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Địa Chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Địa Chỉ" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Tỉnh/Thành Phố</Form.Label>
                            <Form.Control
                                type="text  "
                                placeholder="Tỉnh/Thành Phố"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Đặt hàng
                        </Button>
                    </Form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Pay;
