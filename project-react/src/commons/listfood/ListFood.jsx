import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./listfood.css";
import { NavLink } from "react-router-dom";
function ListFood() {
    return (
        <div style={{ marginTop: "7%" }}>
            <div>
                <h2>DANH MỤC MÓN ĂN</h2>
                <NavLink to="/shop">
                    <div className="listfood">
                        <Card className="card11">
                            <Card.Img
                                variant="top"
                                src="https://static.kfcvietnam.com.vn/images/category/lg/KHUYEN%20MAI.jpg?v=LK8EV4"
                            />
                            <Card.Body>
                                <Button variant="primary">
                                    Ưu Đãi
                                    <i class="fa-solid fa-angle-right"></i>
                                </Button>
                            </Card.Body>
                        </Card>

                        <Card className="card11">
                            <Card.Img
                                variant="top"
                                src="https://static.kfcvietnam.com.vn/images/category/lg/MON%20MOI.jpg?v=LK8EV4"
                            />
                            <Card.Body>
                                <Button variant="primary">
                                    Món Mới
                                    <i class="fa-solid fa-angle-right"></i>
                                </Button>
                            </Card.Body>
                        </Card>

                        <Card className="card11">
                            <Card.Img
                                variant="top"
                                src="https://static.kfcvietnam.com.vn/images/category/lg/COMBO%201%20NGUOI.jpg?v=LK8EV4"
                            />
                            <Card.Body>
                                <Button variant="primary">
                                    Combo 1 Người
                                    <i class="fa-solid fa-angle-right"></i>
                                </Button>
                            </Card.Body>
                        </Card>

                        <Card className="card11">
                            <Card.Img
                                variant="top"
                                src="https://static.kfcvietnam.com.vn/images/category/lg/COMBO%20NHOM.jpg?v=LK8EV4"
                            />
                            <Card.Body>
                                <Button variant="primary">
                                    Combo Nhóm
                                    <i class="fa-solid fa-angle-right"></i>
                                </Button>
                            </Card.Body>
                        </Card>

                        <Card className="card11">
                            <Card.Img
                                variant="top"
                                src="https://static.kfcvietnam.com.vn/images/category/lg/GA.jpg?v=LK8EV4"
                            />
                            <Card.Body>
                                <Button variant="primary">
                                    Gà Rán - Gà Quay
                                    <i class="fa-solid fa-angle-right"></i>
                                </Button>
                            </Card.Body>
                        </Card>

                        <Card className="card11">
                            <Card.Img
                                variant="top"
                                src="https://static.kfcvietnam.com.vn/images/category/lg/COM.jpg?v=LK8EV4"
                            />
                            <Card.Body>
                                <Button variant="primary">
                                    Burger - Cơm - Mì Ý
                                    <i class="fa-solid fa-angle-right"></i>
                                </Button>
                            </Card.Body>
                        </Card>

                        <Card className="card11">
                            <Card.Img
                                variant="top"
                                src="https://static.kfcvietnam.com.vn/images/category/lg/MON%20AN%20NHE.jpg?v=LK8EV4"
                            />
                            <Card.Body>
                                <Button variant="primary">
                                    Thức Ăn Nhẹ
                                    <i class="fa-solid fa-angle-right"></i>
                                </Button>
                            </Card.Body>
                        </Card>

                        <Card className="card11">
                            <Card.Img
                                variant="top"
                                src="https://static.kfcvietnam.com.vn/images/category/lg/TRANG%20MIENG.jpg?v=LK8EV4"
                            />
                            <Card.Body>
                                <Button variant="primary">
                                    Thức uống - Tráng Miệng
                                    <i class="fa-solid fa-angle-right"></i>
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                </NavLink>
            </div>
            <div className="image">
                <img
                    className="anh1"
                    src="https://static.kfcvietnam.com.vn/images/content/home/mobileappbanner/lg/banner.jpg?v=LK8EV4"
                    alt=""
                />
                <div className="image-overlay">
                    <img
                        className="anh2"
                        src="https://kfcvn-static.cognizantorderserv.com/images/content/home/mobileappbanner/boton-google.png"
                        alt=""
                    />
                    <img
                        className="anh2"
                        src="https://kfcvn-static.cognizantorderserv.com/images/content/home/mobileappbanner/boton-app-store.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default ListFood;
