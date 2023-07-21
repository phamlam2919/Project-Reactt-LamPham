import React, { useEffect, useState } from "react";
import Header from "../commons/header/Header";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import ListFood from "../commons/listfood/ListFood";
import Footer from "../commons/footer/Footer";
import "./homepage.css";
import axios from "axios";
function HomePage() {
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

    console.log(user);

    return (
        <div>
            <Header />
            <div className="carousel">
                <Carousel interval={2000}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/buatruavuive.webp?v=LK8EV4"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Summer.webp?v=LK8EV4"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/Homde-phase2.webp?v=LK8EV4"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <ListFood />
            <Footer />
        </div>
    );
}

export default HomePage;
